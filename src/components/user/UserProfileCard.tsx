
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export function UserProfileCard() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  // Calculate the progress to next level (simple algorithm)
  const nextLevelXP = user.level * 1000;
  const progress = (user.xp / nextLevelXP) * 100;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.profilePicture || ""} alt={user.username} />
          <AvatarFallback className="text-xl">{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl">{user.name || user.username}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <span className="text-primary font-semibold">Level {user.level}</span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">XP Progress</span>
              <span className="text-sm font-medium">{user.xp} / {nextLevelXP}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="rounded-lg bg-muted p-3">
              <div className="text-2xl font-bold">{user.streak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <div className="text-2xl font-bold">{user.xp}</div>
              <div className="text-xs text-muted-foreground">Total XP</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
