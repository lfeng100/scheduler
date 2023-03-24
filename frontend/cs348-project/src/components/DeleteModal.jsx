import React from "react";

function DeleteModal(props) {
	return (
        <div className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id={"deleteModal" + props.id} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="ms-5">Are you sure you want to delete this task?</h5>
                    </div>
                    <div className="modal-body d-flex justify-content-center">
                        <button type="button" className="btn btn-primary me-2" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.onDelete}>Delete</button>
                    </div>
                </div>
            </div>
		</div>
    );
}

export default DeleteModal;