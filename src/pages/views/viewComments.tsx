import { CommentProps } from "../../interface";

const ViewComments = ({ data }: { data: any }) => {
  
  return (
    <div>
      <h1>Lists of Comments</h1>

      <div className="mt-5">
        {data &&
          data?.map((comment: CommentProps, index) => {
            return (
              <div key={index} className="bg-gray-800 py-3 px-4 rounded-md mt-2">
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="w-10 rounded-xl">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </div>
                  <small>
                    {comment?.wallet_address?.slice(0, 4)}....
                    {comment?.wallet_address?.slice(4, 10)}
                  </small>
                </div>
                <h1 className="mt-2">{comment?.comment}</h1>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ViewComments;
