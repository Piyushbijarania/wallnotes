import { useState } from 'react';

interface Wallpaper {
  id: number;
  image: string;
}

interface Note {
  id: number;
  text: string;
  x: number;
  y: number;
}

const wallpapers: Wallpaper[] = [
  { id: 1, image: 'https://picsum.photos/200/300' },
  { id: 2, image: 'https://picsum.photos/200/301' },
  { id: 3, image: 'https://picsum.photos/200/302' },
];

const WallpapersApp = () => {
  const [selectedWallpaper, setSelectedWallpaper] = useState(wallpapers[0]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [notePosition, setNotePosition] = useState({ x: 0, y: 0 });

  const handleWallpaperChange = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
  };

  const handleAddNote = () => {
    setNotes([...notes, { id: notes.length + 1, text: newNote, x: notePosition.x, y: notePosition.y }]);
    setNewNote('');
    setShowNoteInput(false);
  };

  const handleNoteClick = (note: Note) => {
    setNotes(notes.filter((n) => n.id !== note.id));
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Wallpapers App</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowNoteInput(true)}>
          Add Note
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {wallpapers.map((wallpaper) => (
          <div key={wallpaper.id} className="cursor-pointer" onClick={() => handleWallpaperChange(wallpaper)}>
            <img src={wallpaper.image} alt="Wallpaper" className="w-full h-48 object-cover" />
          </div>
        ))}
      </div>
      <div className="relative">
        <img src={selectedWallpaper.image} alt="Selected Wallpaper" className="w-full h-screen object-cover" />
        {notes.map((note) => (
          <div key={note.id} className="absolute bg-white p-2 rounded shadow" style={{ top: note.y, left: note.x }}>
            <p className="text-lg">{note.text}</p>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleNoteClick(note)}>
              Delete
            </button>
          </div>
        ))}
        {showNoteInput && (
          <div className="absolute bg-white p-2 rounded shadow" style={{ top: notePosition.y, left: notePosition.x }}>
            <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} className="w-full p-2 border border-gray-400 rounded" />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={handleAddNote}>
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WallpapersApp;