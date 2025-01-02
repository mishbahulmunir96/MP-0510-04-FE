"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { format } from "date-fns";
import { useState } from "react";
import { useSelector } from "react-redux";

const ReferralPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const referrals = user.referrals || [];
  console.log(referrals);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Referral Summary</CardTitle>
          <CardDescription>Your referral code and total points</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Your Referral Code</p>
              <p className="text-2xl font-bold">{user.referralCode}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Total Points Earned</p>
              <p className="text-2xl font-bold">{user.point}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Users Who Used Your Referral Code</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referrals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    No referrals available
                  </TableCell>
                </TableRow>
              ) : (
                referrals.map((referral) => (
                  <TableRow key={referral.id}>
                    <TableCell>
                      {referral.firstName} {referral.lastName}
                    </TableCell>
                    <TableCell>
                      {format(new Date(referral.createdAt), "dd MMM yyyy")}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
export default ReferralPage;
