import Metrics from "@/components/dashboard/Home/Metrics";
import QuickActions from "@/components/dashboard/Home/QuickActions";
import RecentOrders from "@/components/dashboard/Home/RecentOrders";
import TopCategories from "@/components/dashboard/Home/TopCategories";

const page = () => {
  return (
    <div className="space-y-6">
      <Metrics />
      <RecentOrders />
      <div className="grid lg:grid-cols-2 gap-6">
        <TopCategories />
        <QuickActions />
      </div>
    </div>
  );
};

export default page;
