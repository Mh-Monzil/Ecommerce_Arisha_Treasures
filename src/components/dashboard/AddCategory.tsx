import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useCreateCategoryMutation } from "@/features/categoryApi";
import toast from "react-hot-toast";

const AddCategory = ({ refetch }: { refetch: () => void }) => {
  const [createCategory] = useCreateCategoryMutation();
  const [category, setCategory] = useState("");
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  const handleAddCategory = async () => {
    try {
      const res = await createCategory({ name: category }).unwrap();
      console.log(res);
      refetch();
      setCategory("");
      toast.success("Category created successfully!");
      setIsAddCategoryOpen(false);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div>
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className="space-y-2">
            <Label htmlFor="category">Product Category</Label>
            <Input
              id="category"
              name="category"
              placeholder="Enter product title"
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <Button onClick={() => handleAddCategory()}>Add</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCategory;
