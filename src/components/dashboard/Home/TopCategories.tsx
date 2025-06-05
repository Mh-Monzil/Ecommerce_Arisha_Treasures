import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import React from "react";

const TopCategories = () => {
  return (
    <div>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Top Categories</CardTitle>
          <CardDescription>Best performing product categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Dresses</p>
                  <p className="text-sm text-muted-foreground">$12,234</p>
                </div>
                <Progress value={75} className="mt-2" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Tops & Blouses</p>
                  <p className="text-sm text-muted-foreground">$8,567</p>
                </div>
                <Progress value={60} className="mt-2" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Accessories</p>
                  <p className="text-sm text-muted-foreground">$5,432</p>
                </div>
                <Progress value={45} className="mt-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopCategories;
