'use client'

const Pagination = ({pages, currentPage, handlePage}) => {
    const renderPages = () => {
        const pageButtons = [];
        const buttonSize = 40;
        const maxVisiblePages = Math.floor(window.innerWidth * 0.4 / buttonSize);
        const totalVisiblePages = Math.min(maxVisiblePages, pages);
        const halfVisiblePages = Math.floor(totalVisiblePages / 2);
        const startPage = Math.max(
            Math.min(currentPage - halfVisiblePages, pages - totalVisiblePages),
            1
        )
        const endPage = Math.min(startPage + totalVisiblePages - 1, pages);

        for(let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button 
                className={`p-1 flex justify-center items-center mx-1 ${currentPage === i ? 'text-info font-bold' : 'text-secondary'}`} 
                onClick={() => handlePage(i)} key={i}>
                    <span className='size-5 text-center'>{i}</span>
                </button>
            )
        }

        return (
            <>
                {
                    startPage > 1 && (<>
                        <button onClick={() => handlePage(1)}>
                            <span className='size-5 text-center'>1</span>
                        </button>
                        <span>...</span>
                    </>)
                }
                {pageButtons}
                {
                    endPage < pages && (<>
                        <span>...</span>
                        <button 
                        className={`p-1 flex justify-center items-center mx-1 ${currentPage === pages ? 'text-info font-bold' : 'text-secondary'}`}
                        onClick={() => handlePage(pages)}>
                            <span className='size-5 text-center'>{pages}</span>
                        </button>
                    </>)
                }
            </>
        )
    }

  return (
    <div className="flex justify-center items-center gap-2">
        {renderPages()}
    </div>
  )
}

export default Pagination