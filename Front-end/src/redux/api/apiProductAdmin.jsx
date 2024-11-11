import axios from "axios";

import { Toaster, toast } from "sonner";
import {
  updateProductAdminFailed,
  updateProductAdminStart,
  updateProductAdminSuccess,
  productsAdminFailed,
  productsAdminStart,
  productsAdminSuccess,
} from "../productAdmin";
import { dataProducts } from "./apiProduct";

export const dataProductsAdmin = async (dispatch, token, axiosJWT) => {
  dispatch(productsAdminStart());
  try {
    const res = await axiosJWT.get(
      "http://localhost:3000/products/productsadmin",
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    dispatch(productsAdminSuccess(res.data));
  } catch (error) {
    dispatch(productsAdminFailed());
    toast.error(error.response.data.mes);
  }
};
export const createProduct = async (
  dispatch,
  navigate,
  token,
  data,
  axiosJWT
) => {
  dispatch(productsAdminStart());
  try {
    const res = await axiosJWT.post(
      "http://localhost:3000/products/createProducts",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `Bearer ${token}`,
        },
        timeout: 60000,
      }
    );

    dispatch(productsAdminSuccess());
    await dataProductsAdmin(dispatch, token, axiosJWT);
    toast.success("Thêm thành công");
    navigate("/productadmin");
  } catch (error) {
    console.log(error.response.data);
    dispatch(productsAdminFailed());
    if (axios.isCancel(error)) {
      toast.error("Yêu cầu đã vượt quá thời gian chờ");
    } else if (error.response && error.response.data) {
      toast.error(error.response.data);
    } else {
      toast.error("Xảy ra lỗi");
    }
  }
};
export const deleteProduct = async (
  dispatch,
  id,
  navigate,
  token,
  axiosJWT
) => {
  dispatch(productsAdminStart());
  try {
    const res = await axiosJWT.delete(
      `http://localhost:3000/products/delete/${id}`,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    dispatch(productsAdminSuccess());
    await dataProductsAdmin(dispatch, token, axiosJWT);
    navigate("/productadmin");
    toast.success("Xóa thành công");
  } catch (error) {
    dispatch(productsAdminFailed());
    toast.error(error.response.data.mes);
  }
};
export const UpdateProduct = async (
  dispatch,
  id,
  token,
  data,
  navigate,
  axiosJWT
) => {
  dispatch(updateProductAdminStart());
  try {
    const res = await axiosJWT.put(
      `http://localhost:3000/products/update/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `Bearer ${token}`,
        },
      }
    );
    dispatch(updateProductAdminSuccess());
    await dataProductsAdmin(dispatch, token, axiosJWT);
    toast.success("Sửa thành công");
    navigate("/productadmin");
  } catch (error) {
    dispatch(updateProductAdminFailed());
    toast.error(error.response.data.mes);
  }
};
// export const dataCategorys = async (dispatch) => {
//   dispatch(categoryStart());
//   try {
//     const res = await axiosJWT.get("http://localhost:3000/allCategory");
//     dispatch(categorySuccess(res.data));
//   } catch (error) {
//     dispatch(categoryFailed());
//   }
// };
// export const findCategorys = async (dispatch, id) => {
//   dispatch(findcategoryStart());
//   try {
//     const res = await axiosJWT.post(
//       "http://localhost:3000/products/category/" + `${id}`
//     );
//     dispatch(findcategorySuccess(res.data));
//   } catch (error) {
//     dispatch(findcategoryFailed());
//   }
// };
