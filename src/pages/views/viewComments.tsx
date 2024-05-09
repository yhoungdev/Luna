import { CommentProps } from "../../interface";

const ViewComments = ({
  data,
  ownComment,
}: {
  data: any;
  ownComment: boolean;
}) => {
  return (
    <div>
      <h1>Lists of Comments</h1>

      <div className="mt-5 ">
        {data &&
          data?.map((comment: CommentProps, index: number) => {
            const extendCommentClass = `${ownComment ? "border-2 border-green-600" : ""}`;
            return (
              <div
                key={index}
                className={`bg-gray-800 py-3 px-4 rounded-md mt-2 ${extendCommentClass}`}
              >
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="w-10 rounded-xl">
                      <img src="https://api.dicebear.com/8.x/identicon/svg" />
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
