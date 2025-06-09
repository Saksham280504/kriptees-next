'use client';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import MetaData from "@/components/Layouts/MetaData/MetaData";
import Loader from "@/components/Layouts/loader/Loader";
import Sidebar from "@/components/Admin/Siderbar";
import {
  updateProduct,
  clearErrors,
  getProductDetails,
} from "@/actions/productAction";
import { UPDATE_PRODUCT_RESET } from "@/constants/productsConstants";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const productId = params?.id;

  const { error, product } = useSelector((state) => state.productDetails);
  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.deleteUpdateProduct
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Clothing");
  const [isCategory, setIsCategory] = useState(false);
  const [Stock, setStock] = useState(0);
  const [info, setInfo] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const categories = ["Clothing", "T-shirt", "Hoodie"];

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setIsCategory(true);
  };

  const handleInputChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleUpload = () => {
    if (imageUrl.trim() !== '') {
      setImageUrls([...imageUrls, { url: imageUrl }]);
      setImageUrl('');
    }
  };

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category || "Clothing");
      setIsCategory(true);
      setInfo(product.info);
      setStock(product.Stock);
      setImageUrls(product.images || []);
      setSize(product.size || '');
      setColor(product.color || '');
      setTags(product.tags || []);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully");
      router.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, router, isUpdated, productId, product, updateError]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("info", info);
    myForm.set("size", size);
    myForm.set("color", color);
    tags.forEach((tag) => myForm.append("tags", tag));
    imageUrls.forEach((currImg) => {
      myForm.append("images", currImg.url);
    });
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    dispatch(updateProduct(productId, myForm,token));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Product" />
          <div className="flex">
            <Sidebar />
            <div className="flex w-full justify-center bg-gray-100 min-h-screen">
              <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 m-4 w-full max-w-3xl">
                <h2 className="text-2xl font-bold text-gray-700 mb-6">Update Product</h2>
                <form
                  className="w-full space-y-4"
                  encType="multipart/form-data"
                  onSubmit={createProductSubmitHandler}
                >
                  {/* ... (same form content as before, copy-pasted) */}
                  {/* Keep all the JSX inside this form unchanged from your current component */}
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProduct;
