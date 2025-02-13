/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "../../redux/hooks";
import { useSingalUserQuery } from "../../redux/fetchers/auth/userData";
import { useChangeNameMutation } from "../../redux/fetchers/auth/changeName";
import Spinnter from "../../reuseComponents/Spinnter";

const Profile = () => {
  const { email } = useAppSelector(
    (state) => state.auth.user as { email: string }
  );
  const { data, refetch, isLoading } = useSingalUserQuery(email);
  const [changeName] = useChangeNameMutation();

  const handelSubmit = async (e: any) => {
    e.preventDefault();
    const user = {
      name: e.target.name.value,
      email: email,
    };

    await changeName(user);
    refetch();
  };
  return (
    <div>
      <div>
        <form onSubmit={handelSubmit}>
          <div className="flex justify-center items-center mt-[40px]">
            <div className="space-y-2 text-center">
              <h2 className="text-[25px]">{data?.data?.name}</h2>
              <label className="block" htmlFor="name">
                Change Name
              </label>

              <input
                name="name"
                className="p-[5px] border focus:outline-none"
                type="text"
                placeholder="Change Name"
              />
              <div>
                <button className="px-[20px] py-[5px] bg-[#1ABC9C] mt-[10px] cursor-pointer">
                  Change Name
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="flex justify-center items-center">
          <p className="text-center">{isLoading ? <Spinnter /> : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
