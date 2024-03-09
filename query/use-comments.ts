import { DATABASE } from "~/libs/appwrite";
import { useCurrentDealStore } from "./../store/current-deal-store";
import { useQuery } from "@tanstack/vue-query";
import { COLLECTION_COMMENTS, COLLECTION_DEALS, DB_ID } from "~/constants";
import { Query } from "appwrite";

export const useComments = () => {
  const storeDeal = useCurrentDealStore();
  const dealId = storeDeal.deal?.$id;
  return useQuery({
    queryKey: ['comments', dealId],
    queryFn: () => DATABASE.listDocuments(DB_ID, COLLECTION_COMMENTS, [
      Query.equal('deals', dealId)
    ]),
    select: data => data.documents
  })
};





// select: data => {
//   const newComment: IColumn[] = status.map(item => ({
//     ...item,
//     comments: []
//   }))

//   const document = data.documents as unknown as IDeal[]

//   document.forEach((item) => {
//     const newBoard = newComment.find((comment) => comment.id === item.status)
//   })
// }
