"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/components/cart/CartProvider";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  CheckCircle,
  Package,
} from "lucide-react";
import Image from "next/image";
import { useCreateOrderMutation } from "@/features/orderApi";
import toast from "react-hot-toast";

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const OrderPage = () => {
  const [placeOrder] = useCreateOrderMutation();
  const router = useRouter();
  const { items, getTotalPrice, getDiscount, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Form states
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Bangladesh",
  });

  const [shippingMethod, setShippingMethod] = useState("inside-dhaka");
  // const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Redirect if cart is empty
  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-4">
            Add some items to your cart before checking out
          </p>
          <Button onClick={() => router.push("/shop")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const discount = getDiscount();
  const shippingCost = shippingMethod === "inside-dhaka" ? 70 : 150;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingCost + tax;

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare order data according to your schema
      const orderData = {
        name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        email: shippingInfo.email,
        phoneNumber: shippingInfo.phone,
        totalPrice: total,
        discount: discount,
        shippingAddress: {
          street: `${shippingInfo.address}`,
          city: shippingInfo.city,
          state: shippingInfo.state,
          country: shippingInfo.country,
          zipCode: shippingInfo.zipCode,
        },
        orderItems: items.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        paymentMethod: "cash on delivery",
      };
      console.log(orderData);

      const result = await placeOrder(orderData).unwrap();
      console.log(result);

      if (!result.success) {
        toast.error("Order failed!");
        setIsProcessing(false);
        return;
      }

      toast.success("Order placed successfully!");
      setOrderId(result.data.orderId || "Unknown");
      setOrderComplete(true);
      setIsProcessing(false);
      clearCart();
    } catch (error) {
      console.error("Error creating order:", error);
      setIsProcessing(false);
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return (
          shippingInfo.firstName &&
          shippingInfo.lastName &&
          shippingInfo.email.endsWith(".com") &&
          shippingInfo.phone.length >= 11 &&
          shippingInfo.address &&
          shippingInfo.city &&
          shippingInfo.zipCode.length >= 4
        );
      case 2:
        return true; // Since we're only using cash on delivery, no payment validation needed
      case 3:
        return agreeToTerms;
      default:
        return false;
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-[80vh] bg-background flex items-center justify-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-muted-foreground">
                Thank you for your purchase. Your order has been received.
              </p>
            </div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Order Number:</span>
                    <span className="font-bold text-lg">#{orderId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Amount:</span>
                    <span className="font-bold text-lg">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Estimated Delivery:</span>
                    <span className="font-medium">
                      {shippingMethod === "inside-dhaka"
                        ? "2-3 business days"
                        : "5-7 business days"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <p className="text-muted-foreground">
                A confirmation email has been sent to{" "}
                <strong>{shippingInfo.email}</strong>
              </p>
              <p className="text-muted-foreground">
                You can track your order status in your account or use the order
                number above.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => router.push("/shop")} variant="outline">
                  Continue Shopping
                </Button>
                <Button onClick={() => router.push("/orders")}>
                  Track Your Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
                Go Back
              </Button>
            </div>
            <Badge variant="outline">Secure Checkout</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step
                      ? "bg-pink-600 text-white"
                      : "bg-muted text-muted-foreground border-2 border-muted"
                  }`}
                >
                  {currentStep > step ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <div
                    className={`text-sm font-medium ${
                      currentStep >= step
                        ? "text-pink-600"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step === 1
                      ? "Shipping"
                      : step === 2
                      ? "Payment"
                      : "Review"}
                  </div>
                </div>
                {step < 3 && <div className="flex-1 h-px bg-muted mx-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="h-5 w-5" />
                    <span>Shipping Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            firstName: e.target.value,
                          })
                        }
                        placeholder="First Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            lastName: e.target.value,
                          })
                        }
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            email: e.target.value,
                          })
                        }
                        placeholder="email@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={shippingInfo.phone}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            phone: e.target.value,
                          })
                        }
                        placeholder="+880 1234-567890"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          address: e.target.value,
                        })
                      }
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            city: e.target.value,
                          })
                        }
                        placeholder="City"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={shippingInfo.state}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            state: e.target.value,
                          })
                        }
                        placeholder="State"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            zipCode: e.target.value,
                          })
                        }
                        placeholder="ZIP Code"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      value={shippingInfo.country}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          country: e.target.value,
                        })
                      }
                      placeholder="Country"
                    />
                  </div>

                  {/* Delivery Method */}
                  <div className="space-y-4">
                    <Label>Shipping Method</Label>
                    <RadioGroup
                      value={shippingMethod}
                      onValueChange={setShippingMethod}
                    >
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem
                          value="inside-dhaka"
                          id="inside-dhaka"
                        />
                        <Label
                          htmlFor="inside-dhaka"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="w-full flex justify-between items-center">
                            <div>
                              <div className="font-medium">Inside Dhaka</div>
                              <div className="text-sm text-muted-foreground">
                                2-3 business days
                              </div>
                            </div>
                            <div className="font-medium text-lg">$70</div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem
                          value="outside-dhaka"
                          id="outside-dhaka"
                        />
                        <Label
                          htmlFor="outside-dhaka"
                          className="flex-1 cursor-pointer"
                        >
                          <div className=" w-full flex justify-between items-center">
                            <div>
                              <div className="font-medium">Outside Dhaka</div>
                              <div className="text-sm text-muted-foreground">
                                5-7 business days
                              </div>
                            </div>
                            <div className="font-medium text-lg">$150</div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleNextStep} disabled={!isStepValid(1)}>
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Payment Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Payment Method */}
                  <div className="space-y-4">
                    <Label>Payment Method</Label>
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Cash on Delivery</div>
                          <div className="text-sm text-muted-foreground">
                            Pay when your order arrives
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handlePreviousStep}>
                      Back to Shipping
                    </Button>
                    <Button onClick={handleNextStep} disabled={!isStepValid(2)}>
                      Review Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Review Order */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Review Your Order</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Items */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Order Items</h4>
                    {items.map((item) => (
                      <div
                        key={`${item._id}`}
                        className="flex space-x-4 p-4 border rounded-lg"
                      >
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium">{item.title}</h5>
                          <p className="text-sm text-muted-foreground">
                            • Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            $
                            {(
                              item.price * item.quantity -
                              (item.price * item.quantity * item.discount) / 100
                            ).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Shipping Information Summary */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Shipping Address</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        {shippingInfo.firstName} {shippingInfo.lastName}
                      </p>
                      <p>{shippingInfo.address}</p>

                      <p>
                        {shippingInfo.city}, {shippingInfo.state}{" "}
                        {shippingInfo.zipCode}
                      </p>
                      <p>{shippingInfo.country}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Information Summary */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Payment Method</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>Cash on Delivery</p>
                      <p className="text-xs">
                        Pay when your order arrives at your doorstep
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Special Instructions */}
                  <div className="space-y-2">
                    <Label htmlFor="instructions">
                      Special Instructions (optional)
                    </Label>
                    <Textarea
                      id="instructions"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="Any special delivery instructions..."
                      rows={3}
                    />
                  </div>

                  {/* Terms and Newsletter */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={agreeToTerms}
                        onCheckedChange={(checked) =>
                          setAgreeToTerms(checked === true)
                        }
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <a href="#" className="text-pink-600 hover:underline">
                          Terms and Conditions
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-pink-600 hover:underline">
                          Privacy Policy
                        </a>
                        *
                      </Label>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handlePreviousStep}>
                      Back to Payment
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={!isStepValid(3) || isProcessing}
                      className="min-w-[150px]"
                    >
                      {isProcessing ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing...</span>
                        </div>
                      ) : (
                        `Place Order • $${total.toFixed(2)}`
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={`${item._id}`} className="flex space-x-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.title}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        $
                        {(
                          item.price * item.quantity -
                          (item.price * item.quantity * item.discount) / 100
                        ).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>৳{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>৳{shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>৳{tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>৳{total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
