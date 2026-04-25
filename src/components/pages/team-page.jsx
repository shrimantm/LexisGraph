"use client";

import { useState, useEffect } from "react";
import { safeFetch } from "@/lib/api";
import { MOCK_TEAM } from "@/lib/mock-data";
import {
  Users, UserPlus, Shield, Eye, Loader2, Mail, MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const roleIcons = {
  admin: Shield,
  analyst: Eye,
  viewer: Eye,
};

const roleColors = {
  admin: "border-violet-800 bg-violet-900/30 text-violet-300",
  analyst: "border-blue-800 bg-blue-900/30 text-blue-300",
  viewer: "border-slate-700 bg-slate-900 text-slate-400",
};

const statusColors = {
  active: "border-emerald-800 bg-emerald-900/30 text-emerald-300",
  invited: "border-amber-800 bg-amber-900/30 text-amber-300",
  inactive: "border-slate-700 bg-slate-900 text-slate-500",
};

function normalizeMember(member) {
  const email = member?.email || "unknown@company.com";
  const name = member?.name || email.split("@")[0];
  const role = String(member?.role || "viewer").toLowerCase();
  return {
    _id: member?._id || member?.id || `user_${Date.now()}`,
    name,
    email,
    role,
    status: String(member?.status || "active").toLowerCase(),
    avatar: member?.avatar || name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
    joined: member?.joined || (member?.created_at
      ? new Date(member.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })),
  };
}

export function TeamPage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviting, setInviting] = useState(false);
  const [inviteStatus, setInviteStatus] = useState(null);

  useEffect(() => {
    async function fetchTeam() {
      const { data, isDemo: demoMode } = await safeFetch("/org/team", {}, MOCK_TEAM);
      setTeam((Array.isArray(data) ? data : MOCK_TEAM).map(normalizeMember));
      setIsDemo(demoMode);
      setLoading(false);
    }
    fetchTeam();
  }, []);

  async function handleInvite(e) {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    setInviting(true);

    const { isDemo: demoMode } = await safeFetch("/org/invite", {
      method: "POST",
      body: JSON.stringify({ email: inviteEmail.trim() }),
    }, { success: true });

    // Add mock invited user
    const newMember = {
      _id: `user_${Date.now()}`,
      name: inviteEmail.split("@")[0],
      email: inviteEmail.trim(),
      role: "viewer",
      status: "invited",
      avatar: inviteEmail.slice(0, 2).toUpperCase(),
      joined: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };

    setTeam((prev) => [...prev, normalizeMember(newMember)]);
    setInviteEmail("");
    setInviting(false);
    setInviteStatus(demoMode ? "Invitation sent (demo mode)" : "Invitation sent!");

    setTimeout(() => setInviteStatus(null), 3000);
  }

  const activeCount = team.filter((m) => m.status === "active").length;
  const invitedCount = team.filter((m) => m.status === "invited").length;

  if (loading) {
    return (
      <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
        <CardContent className="flex items-center justify-center gap-3 py-16 text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading team...
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{team.length}</p>
              <p className="text-xs text-slate-400">Total Members</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{activeCount}</p>
              <p className="text-xs text-slate-400">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{invitedCount}</p>
              <p className="text-xs text-slate-400">Pending</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invite Section */}
      <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-blue-400" />
            Invite Team Member
          </CardTitle>
          <CardDescription className="text-slate-400 text-xs">
            Add new members to your organization workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleInvite} className="flex items-center gap-3">
            <Input
              type="email"
              placeholder="colleague@company.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="h-9 border-slate-700 bg-slate-950/70 text-slate-100 placeholder:text-slate-500"
              disabled={inviting}
            />
            <Button type="submit" disabled={!inviteEmail.trim() || inviting} className="h-9 shrink-0 gap-2">
              {inviting ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
              Invite
            </Button>
          </form>
          {inviteStatus && (
            <p className="mt-3 text-xs text-emerald-400 animate-fade-in">{inviteStatus}</p>
          )}
        </CardContent>
      </Card>

      {/* Team Members List */}
      <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Team Members</CardTitle>
              <CardDescription className="text-slate-400">
                Manage your organization&apos;s team and permissions
              </CardDescription>
            </div>
            {isDemo && (
              <Badge className="border-amber-800 bg-amber-900/30 text-amber-300 text-[10px]" variant="outline">
                Demo Mode
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {team.map((member) => {
              const RoleIcon = roleIcons[member.role] || Eye;

              return (
                <div
                  key={member._id}
                  className="group flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] transition-colors hover:bg-white/[0.04]"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border border-slate-700 bg-slate-800">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-slate-200 text-sm font-semibold">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-slate-200">{member.name}</p>
                      <p className="text-xs text-slate-500">{member.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge className={roleColors[member.role] || roleColors.viewer} variant="outline">
                      <RoleIcon className="h-3 w-3 mr-1" />
                      {member.role}
                    </Badge>
                    <Badge className={statusColors[member.status] || statusColors.inactive} variant="outline">
                      {member.status}
                    </Badge>
                    <span className="text-xs text-slate-500 hidden sm:inline">{member.joined}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
