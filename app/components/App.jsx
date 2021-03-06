import React from 'react';
import uuid from 'uuid';
import Notes from './Notes';
import connect from '../libs/connect';
import NoteActions from '../actions/NoteActions';

const notes = [
  {
    id: uuid.v4(),
    task: 'Learn React'
  },
  {
    id: uuid.v4(),
    task: 'Do laundry'
  }
];



class App extends React.Component {
  
  render() {
    const {notes} = this.props;

    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes 
          notes={notes}
          onNoteClick={this.activateNoteEdit}
          onEdit={this.editNote}
          onDelete={this.deleteNote} 
        />
      </div>
    );
  }

  addNote = () => {
    this.props.NoteActions.create({
      id: uuid.v4(),
      task: 'New task'
    });
  }

  deleteNote = (id, e) => {
    // Avoid triggering possible other events elsewhere when we delete a note
    e.stopPropagation();

    this.props.NoteActions.delete(id);
  }

  activateNoteEdit = (id) => {
    this.props.NoteActions.update({id, editing: true});
  }

  editNote = (id, task) => {
    this.props.NoteActions.update({id, task, editing: false});
  }
}

export default connect(({notes}) => ({
  notes
}), {
  NoteActions
})(App)