const Modal = ({children, handleModalClose, open, title}) => {


    // TODO Bu yerdagi handleModalClose === setModalStatega teng setModalState esa modalState o'zgartirish uchun umumiy ma'noda bularning bari View bosilganda modal ochilishi va Close bosilganda yopilishi uchun xizmat qiladi 

    // TODO Har bitta modalka uchun alohida state bo'lishi kerak




    return (
     <div 
     className={`modal fade ${open ? 'show' : ''}`} 
     tabindex="-1"
     style={{
         display: open ? 'block' : 'none'
     }}
     
     >
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" onClick={() => handleModalClose(false)} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                {children}
            </div>
            
            </div>
        </div>
    </div>
    )
}

export default Modal;