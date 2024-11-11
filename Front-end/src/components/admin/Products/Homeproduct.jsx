import { useSelector, useDispatch } from "react-redux";
import CreateProduct from "./CreateProduct";
import Update from "./update";
import { NavLink, Link, useNavigate } from "react-router-dom";
// import "../HomeAdmin.scss";
// import "../productsAdmin.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toaster, toast } from "sonner";
import { deleteProduct } from "../../../redux/api/apiProductAdmin";
import { useEffect, useState } from "react";
import Model from "../../../common/Model";
import {
  useAccessToken,
  useDataCurrentUser,
  useDataProduct,
  useDataProductAdmin,
} from "../../../common/dataReux";
import { createAxios } from "../../../common/createInstane";
import { loginSuccess } from "../../../redux/authSlice";

const HomeProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const text = "Bạn có chắc chắn muốn xóa không?";
  const textheader = "Delete";
  const textfooter = "Xóa";
  const token = useAccessToken();
  const alldataProducts = useDataProductAdmin();
  const dataCurrent = useDataCurrentUser();
  let axiosJWT = createAxios(dataCurrent, dispatch, loginSuccess);

  const handleDelete = async (id) => {
    deleteProduct(dispatch, id, navigate, token, axiosJWT);
  };
  return (
    <>
      <div className="Container-Admin-product">
        <h3>Quản lý sản phẩm</h3>
        <div className="d-flex justify-content-end">
          <NavLink
            className="btn btn-success create-product-button"
            to="/createProduct"
          >
            <FontAwesomeIcon className="iconadd" icon={faPlus} />
            Thêm sản phẩm
          </NavLink>
        </div>

        <div className="admin-container-table">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Ảnh</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Giá tiền</th>
                <th scope="col">Chi tiết sản phẩm</th>
                <th className="category" scope="col">
                  Danh mục
                </th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            {alldataProducts.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <th scope="row">
                      <img
                        className="admin-item-img"
                        src={`${item.Image}`}
                        alt=""
                      ></img>
                    </th>
                    <td>
                      <p className="Admin-item">{item.Name}</p>
                    </td>
                    <td>
                      <p className="Admin-item">{item.Price} VNĐ</p>
                    </td>
                    <td>
                      <p className="Admin-item">{item.Description}</p>
                    </td>
                    <td>
                      <p className="Admin-item">{item.Category}</p>
                    </td>
                    <td>
                      <div className="Admin-item">
                        {/* <button
                          className="amount-btn"
                          // onClick={() => handcleclinkRemove(item._id)}
                        >
                          {/* <FontAwesomeIcon icon={faTrashCan} /> */}
                        {/* Edit */}
                        {/* </button> */}
                        <Link className="admin-edit" to={`/edit/${item._id}`}>
                          Edit
                        </Link>
                      </div>
                    </td>
                    <td>
                      {/* <div className="admin-delete-btn"> */}
                      <Model
                        className="Create-submit"
                        handleSubmit={handleDelete}
                        textheader={textheader}
                        textbody={text}
                        textfooter={textfooter}
                        id={item._id}
                      />
                      {/* </div> */}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};
export default HomeProducts;
