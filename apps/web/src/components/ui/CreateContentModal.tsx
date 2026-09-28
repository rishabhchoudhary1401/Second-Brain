import Button from "./Button";

export function CreateContentModal({ opened, onClose }) {
  if (!opened) return null;

  return (
    <div onClick={onClose} className="bg-slate-500/70 fixed top-0 left-0 h-full w-full flex justify-center items-center ">
        <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center bg-white p-16 rounded-2xl border relative">
            <button onClick={onClose} className="absolute right-3 top-3 cursor-pointer"
    >
      ✕
    </button>
            <div className="grid gap-2">
                <input className="border rounded pl-2 pr-8 py-2 text-black" type="text" placeholder="Title" />
                <input className="border rounded pl-2 pr-8 py-2 text-black" type="text" placeholder="Link" />
                <select className="border rounded pl-1 pr-8 py-2 text-black bg-white">
                    <option value="">Select type</option>
                    <option value="youtube">YouTube</option>
                    <option value="twitter">Twitter</option>
                    <option value="article">Article</option>
                    <option value="document">Document</option>
                </select>
                <input className="border rounded pl-2 pr-8 py-2 text-black" type="text" placeholder="tags" />
            </div>

            <div className="mt-4">
                <Button text="Submit" variant="primary" />
            </div>
        </div>
    </div>
  );
}