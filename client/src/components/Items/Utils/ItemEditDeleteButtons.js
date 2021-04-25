import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import ItemDeleteConfirmation from '../Delete/ItemDeleteConfirmation';
import ItemEditModal from '../Edit/ItemEditModal';

export default function ItemAddDelete(props) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const handleCloseModal = () => {
    setDeleteModal(false);
  };

  const handleOpenModal = () => {
    setDeleteModal(true);
  };

  const openEditModal = () => {
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={openEditModal} style={{marginRight: '10px'}}>
        Edit
      </Button>
      <Button color="default" onClick={handleOpenModal}>
        Delete
      </Button>
      <ItemDeleteConfirmation
        open={deleteModal}
        closeModal={handleCloseModal}
        name={props.kopi.name}
        kopi={props.kopi}
      />
      <ItemEditModal editOpen={editModal} handleEditClose={closeEditModal} cat={props.cat} kopi={props.kopi} />
    </>
  );
}
