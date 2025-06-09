"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Truck,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Download,
  Printer,
  RefreshCw,
  Plus,
  Trash2,
} from "lucide-react";
import {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "@/features/orderApi";
import { IOrder, IOrderItem } from "@/interfaces/order";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

const OrdersPage = () => {
  const {
    data: orders,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllOrdersQuery({});
  const [updateOrder] = useUpdateOrderMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  // const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(
    null
  );
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
  const [isEditOrderOpen, setIsEditOrderOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<(typeof orders)[0] | null>(
    null
  );

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading orders...</p>
      </div>
    );
  }

  const allStatuses = orders?.data?.map((order: IOrder) => order.status);
  const statuses = ["all", ...new Set(allStatuses)];

  const filteredOrders = orders?.data?.filter((order: IOrder) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.user ? order.user.name : order.name)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (order.user ? order.user.email : order.email)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-gray-500" />;
      case "processing":
        return <RefreshCw className="h-4 w-4 text-blue-500" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const estimatedDeliveryDate = (createdAt: string) => {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + 7);
    return formatDate(date.toISOString());
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const openOrderDetail = (order: (typeof orders)[0]) => {
    setSelectedOrder(order);
    setIsOrderDetailOpen(true);
  };

  const openEditOrder = (order: (typeof orders)[0]) => {
    setEditingOrder({ ...order });
    setIsEditOrderOpen(true);
  };

  const totalRevenue = orders?.data?.reduce(
    (sum: number, order: IOrder) => sum + order.totalPrice,
    0
  );
  const pendingOrders = orders?.data?.filter(
    (order: IOrder) => order.status === "pending"
  ).length;
  const processingOrders = orders?.data?.filter(
    (order: IOrder) => order.status === "processing"
  ).length;
  // const deliveredOrders = orders?.data?.filter(
  //   (order) => order.status === "delivered"
  // ).length;

  const updateEditedOrder = async () => {
    try {
      if (editingOrder) {
        const res = await updateOrder({
          id: editingOrder._id,
          data: editingOrder,
        });
        setIsEditOrderOpen(false);
        console.log("Order updated:", res);
        setEditingOrder(null);
        refetch();
        toast.success("Order updated successfully!");
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders?.data?.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pendingOrders + processingOrders}
            </div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Order Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(totalRevenue / orders?.data?.length).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.1%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>
                Track and manage customer orders
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders by ID, customer name, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {(statuses as string[]).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === "all" ? "All Status" : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent className="px-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order: IOrder) => (
                <TableRow
                  key={order._id}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <div>
                        <div className="font-medium">{order.orderId}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatTime(order.createdAt)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={"/placeholder.svg"} />
                        <AvatarFallback>
                          {(order.user ? order.user.name : order.name)
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {order.user ? order.user.name : order.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {order.user ? order.user.email : order.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {order.orderItems.length} item
                      {order.orderItems.length > 1 ? "s" : ""}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {order.orderItems[0].productId.title}
                      {order.orderItems.length > 1 &&
                        ` +${order.orderItems.length - 1} more`}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {formatDate(order.createdAt as string)}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    {order.status === "delivered" ? (
                      <Badge className="bg-green-100 text-green-800">COD</Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">Due</Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    ${order.totalPrice.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => openOrderDetail(order)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditOrder(order)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Order
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Printer className="h-4 w-4 mr-2" />
                          Print Invoice
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Detail Modal */}
      <Dialog open={isOrderDetailOpen} onOpenChange={setIsOrderDetailOpen}>
        <DialogContent className="min-w-full lg:min-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <span>Order Details - {selectedOrder?.orderId}</span>
              {selectedOrder && getStatusBadge(selectedOrder.status)}
            </DialogTitle>
            <DialogDescription>
              Order placed on{" "}
              {selectedOrder && formatDate(selectedOrder.createdAt)} at{" "}
              {selectedOrder && formatTime(selectedOrder.createdAt)}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Customer Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={"/placeholder.svg"} />
                        <AvatarFallback>
                          {(selectedOrder.user
                            ? selectedOrder.user.name
                            : selectedOrder.name
                          )
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {selectedOrder.user
                            ? selectedOrder.user.name
                            : selectedOrder.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Customer
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {selectedOrder.user
                            ? selectedOrder.user.email
                            : selectedOrder.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {selectedOrder.phoneNumber}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <span>Shipping Address</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-1">
                      <div>{selectedOrder.shippingAddress.street}</div>
                      <div>
                        {selectedOrder.shippingAddress.city},{" "}
                        {selectedOrder.shippingAddress.state}{" "}
                        {selectedOrder.shippingAddress.zip}
                      </div>
                      <div>{selectedOrder.shippingAddress.country}</div>
                    </div>
                    {selectedOrder.trackingNumber && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <div className="text-sm font-medium">
                          Tracking Number
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {selectedOrder.trackingNumber}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Order Items</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedOrder.orderItems.map(
                      (item: IOrderItem, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                              <Package className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                              <div className="font-medium">
                                {item.productId.title}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {item.productId.category}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              ${item.productId.price.toFixed(2)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                    <Separator />
                    <div className="flex justify-between items-center font-medium">
                      <span>Total</span>
                      <span>${selectedOrder.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment & Status */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <CreditCard className="h-5 w-5" />
                      <span>Payment Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-medium">COD</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Amount:</span>
                        <span className="font-medium">
                          ${selectedOrder.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Truck className="h-5 w-5" />
                      <span>Delivery Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Status:</span>
                        {getStatusBadge(selectedOrder.status)}
                      </div>
                      {selectedOrder.estimatedDelivery && (
                        <div className="flex justify-between">
                          <span>Estimated Delivery:</span>
                          <span>
                            {estimatedDeliveryDate(selectedOrder.createdAt)}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Notes */}
              {selectedOrder.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Order Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{selectedOrder.notes}</p>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Invoice
                </Button>
                <Button
                  variant="outline"
                  onClick={() => openEditOrder(selectedOrder)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Order
                </Button>
                <Button>
                  <Truck className="h-4 w-4 mr-2" />
                  Update Status
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Order Modal */}
      <Dialog open={isEditOrderOpen} onOpenChange={setIsEditOrderOpen}>
        <DialogContent className="min-w-full lg:min-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="h-5 w-5" />
              <span>Edit Order - {editingOrder?.id}</span>
            </DialogTitle>
            <DialogDescription>
              Modify order details, status, and customer information
            </DialogDescription>
          </DialogHeader>
          {editingOrder && (
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Order Details</TabsTrigger>
                <TabsTrigger value="items">Items</TabsTrigger>
                <TabsTrigger value="customer">Customer</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>

              {/* Order Details Tab */}
              <TabsContent value="details" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Order Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="order-status">Order Status</Label>
                        <Select
                          value={editingOrder.status}
                          onValueChange={(value) =>
                            setEditingOrder({ ...editingOrder, status: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">
                              Processing
                            </SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="payment-status">Payment Status</Label>
                        <Input
                          id="payment-status"
                          type="text"
                          defaultValue={
                            editingOrder.status === "delivered" ? "COD" : "Due"
                          }
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tracking-number">Tracking Number</Label>
                        <Input
                          id="tracking-number"
                          value={editingOrder.trackingNumber || ""}
                          onChange={(e) =>
                            setEditingOrder({
                              ...editingOrder,
                              trackingNumber: e.target.value,
                            })
                          }
                          placeholder="Enter tracking number"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Delivery Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="estimated-delivery">
                          Estimated Delivery Date
                        </Label>
                        <Input
                          id="estimated-delivery"
                          type="text"
                          defaultValue={estimatedDeliveryDate(
                            editingOrder.createdAt
                          )}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="order-notes">Order Notes</Label>
                        <Textarea
                          id="order-notes"
                          value={editingOrder.notes}
                          onChange={(e) =>
                            setEditingOrder({
                              ...editingOrder,
                              notes: e.target.value,
                            })
                          }
                          placeholder="Add internal notes about this order..."
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Items Tab */}
              <TabsContent value="items" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Order Items</CardTitle>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {editingOrder.orderItems.map(
                        (item: IOrderItem, index: number) => (
                          <div
                            key={index}
                            className="flex items-center space-x-4 p-4 border rounded-lg"
                          >
                            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                              <Package className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="grid gap-2 md:grid-cols-3">
                                <div>
                                  <Label className="text-xs">
                                    Product Title
                                  </Label>
                                  <Input
                                    value={item.productId.title}
                                    readOnly
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="quantity" className="text-xs">
                                    Quantity
                                  </Label>
                                  <Input
                                    id={`quantity`}
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => {
                                      const updatedItems =
                                        editingOrder.orderItems.map(
                                          (item: IOrderItem, i: number) =>
                                            i === index
                                              ? {
                                                  ...item,
                                                  quantity:
                                                    Number.parseInt(
                                                      e.target.value
                                                    ) || 1,
                                                }
                                              : item
                                        );
                                      setEditingOrder({
                                        ...editingOrder,
                                        orderItems: updatedItems,
                                        totalPrice: updatedItems.reduce(
                                          (sum: number, item: IOrderItem) =>
                                            sum +
                                            item.quantity *
                                              item.productId.price,
                                          0
                                        ),
                                      });
                                    }}
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Price</Label>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    value={item.productId.price.toFixed(2)}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end">
                                <div className="text-sm font-medium">
                                  Subtotal: $
                                  {(
                                    item.quantity * item.productId.price
                                  ).toFixed(2)}
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                const newItems = editingOrder.orderItems.filter(
                                  (_: IOrderItem, i: number) => i !== index
                                );
                                const newTotal = newItems.reduce(
                                  (sum: number, item: IOrderItem) =>
                                    sum + item.quantity * item.productId.price,
                                  0
                                );
                                setEditingOrder({
                                  ...editingOrder,
                                  orderItems: newItems,
                                  totalPrice: newTotal,
                                });
                              }}
                              className="mb-3.5 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )
                      )}
                      <Separator />
                      <div className="flex justify-between items-center font-medium text-lg">
                        <span>Order Total</span>
                        <span>
                          $
                          {editingOrder.orderItems
                            .reduce(
                              (sum: number, item: IOrderItem) =>
                                sum + item.quantity * item.productId.price,
                              0
                            )
                            .toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Customer Tab */}
              <TabsContent value="customer" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="customer-name">Full Name</Label>
                        <Input
                          id="customer-name"
                          defaultValue={editingOrder.name}
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customer-email">Email Address</Label>
                        <Input
                          id="customer-email"
                          type="email"
                          defaultValue={editingOrder.email}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customer-phone">Phone Number</Label>
                      <Input
                        id="customer-phone"
                        value={editingOrder.phoneNumber}
                        onChange={(e) =>
                          setEditingOrder({
                            ...editingOrder,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Shipping Tab */}
              <TabsContent value="shipping" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="street-address">Street Address</Label>
                      <Input
                        id="street-address"
                        value={editingOrder.shippingAddress.street}
                        onChange={(e) =>
                          setEditingOrder({
                            ...editingOrder,
                            shippingAddress: {
                              ...editingOrder.shippingAddress,
                              street: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={editingOrder.shippingAddress.city}
                          onChange={(e) =>
                            setEditingOrder({
                              ...editingOrder,
                              shippingAddress: {
                                ...editingOrder.shippingAddress,
                                city: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={editingOrder.shippingAddress.state}
                          onChange={(e) =>
                            setEditingOrder({
                              ...editingOrder,
                              shippingAddress: {
                                ...editingOrder.shippingAddress,
                                state: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input
                          id="zip"
                          value={editingOrder.shippingAddress.zip}
                          onChange={(e) =>
                            setEditingOrder({
                              ...editingOrder,
                              shippingAddress: {
                                ...editingOrder.shippingAddress,
                                zip: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={editingOrder.shippingAddress.country}
                          onChange={(e) =>
                            setEditingOrder({
                              ...editingOrder,
                              shippingAddress: {
                                ...editingOrder.shippingAddress,
                                country: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Action Buttons */}
              <div className="flex justify-between pt-6">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditOrderOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => {
                      // Here you would typically save the changes
                      console.log("Saving order changes:", editingOrder);
                      setIsEditOrderOpen(false);
                      updateEditedOrder();
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders found</h3>
            <p className="text-muted-foreground text-center">
              Try adjusting your search criteria or check back later for new
              orders.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrdersPage;
