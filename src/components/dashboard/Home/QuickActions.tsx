import { Card } from "@/components/ui/card";
import { Package, ShoppingCart, TrendingUp, Users } from "lucide-react";
import React from "react";

const QuickActions = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-6">
        <div className="h-full flex items-center space-x-4">
          <div className="p-2 bg-pink-100 rounded-lg">
            <Package className="h-6 w-6 text-pink-600" />
          </div>
          <div>
            <h3 className="font-semibold">Add Product</h3>
            <p className="text-sm text-muted-foreground">
              Create new product listing
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="h-full flex items-center space-x-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold">Customer Support</h3>
            <p className="text-sm text-muted-foreground">
              View pending tickets
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="h-full flex items-center space-x-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold">Analytics</h3>
            <p className="text-sm text-muted-foreground">
              View detailed reports
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="h-full flex items-center space-x-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <ShoppingCart className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold">Promotions</h3>
            <p className="text-sm text-muted-foreground">
              Create discount codes
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QuickActions;
