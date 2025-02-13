import { ChangeEventHandler, useEffect, useState } from "react";
import { useGetAllUserQuery } from "../../redux/fetchers/auth/getallUser";
import Spinnter from "../../reuseComponents/Spinnter";
import { useChangeStausMutation } from "../../redux/fetchers/auth/changeuserStatus";

type Tuser = {
  name: string;
  email: string;
  role: string;
  status: string;
  _id: string;
};

const Manageuser = () => {
  const [statusmess, setStatusm] = useState("");
  const { data, isLoading, refetch } = useGetAllUserQuery("");
  const [status, { isSuccess, isLoading: statusLoadin }] =
    useChangeStausMutation();
  const handelRole: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedStatus = e.target.value;
    const userId = e.target.dataset.userid;

    if (userId) {
      const userIn = { status: selectedStatus, userId };
      status(userIn);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setStatusm("status Update Successfylly");
      refetch();
    }
  }, [isSuccess]);
  return (
    <div>
      <p className="text-center">
        {isSuccess ? `${statusmess}` : ""}
        {statusLoadin ? "Loading........" : ""}
      </p>
      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4}>
                  <Spinnter />
                </td>
              </tr>
            )}
            {statusLoadin && (
              <tr>
                <td colSpan={4}>
                  <Spinnter />
                </td>
              </tr>
            )}

            {data?.data &&
              data.data.map((item: Tuser) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <select
                      onChange={(e) => handelRole(e)}
                      value={item.status}
                      className="select select-accent w-full max-w-xs"
                      data-userid={item._id}
                    >
                      <option value="active">Active</option>
                      <option value="block">Block</option>
                    </select>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manageuser;
