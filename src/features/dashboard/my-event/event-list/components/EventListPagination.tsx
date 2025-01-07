// "use client";

// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// interface EventListPaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// export function EventListPagination({ currentPage, totalPages, onPageChange }: EventListPaginationProps) {
//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       onPageChange(currentPage - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       onPageChange(currentPage + 1);
//     }
//   };

//   const renderPageNumbers = () => {
//     const pageNumbers = [];
//     const maxVisiblePages = 5;
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(
//         <PaginationItem key={i}>
//           <PaginationLink
//             href="#"
//             onClick={() => onPageChange(i)}
//             isActive={i === currentPage}
//           >
//             {i}
//           </PaginationLink>
//         </PaginationItem>
//       );
//     }

//     return pageNumbers;
//   };

//   return (
//     <Pagination>
//       <PaginationContent>
//         <PaginationItem>
//           <PaginationPrevious href="#" onClick={handlePrevious} disabled={currentPage === 1} />
//         </PaginationItem>
//         {renderPageNumbers()}
//         <PaginationItem>
//           <PaginationNext href="#" onClick={handleNext} disabled={currentPage === totalPages} />
//         </PaginationItem>
//       </PaginationContent>
//     </Pagination>
//   );
// }
