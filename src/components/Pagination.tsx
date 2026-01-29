import { useMemo } from "react";

interface PaginationProps {
  total: number; // 总页数
  current: number; // 当前页码
  onChange: (page: number) => void; // 页码变化回调
}

function Pagination({ total, current, onChange }: PaginationProps) {
  // 生成显示的页码数组
  const displayPages = useMemo(() => {
    if (total <= 0) {
      return [];
    }

    const pages: number[] = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      let start = current - 2;
      let end = current + 2;

      if (current <= 3) {
        start = 1;
        end = 5;
      } else if (current >= total - 2) {
        start = total - 4;
        end = total;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  }, [total, current]);

  // 处理上一页
  const handlePrev = () => {
    if (current > 1) {
      onChange(current - 1);
    }
  };

  // 处理下一页
  const handleNext = () => {
    if (current < total) {
      onChange(current + 1);
    }
  };

  // 处理页码点击
  const handlePageClick = (page: number) => {
    if (page !== current) {
      onChange(page);
    }
  };

  // 如果没有数据或只有一页，不显示分页
  if (total <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-2 m-4 flex-wrap transition-all duration-500">
      {/* 上一页按钮 */}
      <button
        onClick={handlePrev}
        disabled={current === 1}
        className={`
          border border-p
          rounded px-4 py-2 
          duration-200 hover:bg-p hover:bg-opacity-10
          ${current === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        上一页
      </button>

      {/* 页码按钮 */}
      {displayPages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`min-w-10 h-10 border border-p rounded duration-200
            ${
              page === current ? "bg-p text-white" : "hover:bg-p hover:bg-opacity-10 cursor-pointer"
            }`}
        >
          {page}
        </button>
      ))}

      {/* 下一页按钮 */}
      <button
        onClick={handleNext}
        disabled={current === total}
        className={`
          border border-p
          rounded px-4 py-2 
          duration-200
          hover:bg-p hover:bg-opacity-10
          ${current === total ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        下一页
      </button>

      {/* 总页数显示 */}
      <div className="ml-4 text-gray-500 text-sm whitespace-nowrap">共 {total} 页</div>
    </div>
  );
}

export default Pagination;
