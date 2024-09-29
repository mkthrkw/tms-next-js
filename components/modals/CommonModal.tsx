export function CommonModal({
  children,
  dialog,
  title,
  text,
  addClass,
}:{
  children: React.ReactNode,
  dialog: React.RefObject<HTMLDialogElement>,
  title?: string,
  text?: string,
  addClass?: string,
}) {
  const closeHandler = () => {
    dialog.current?.close();
  }

  return (
    <dialog className="modal w-screen h-screen" ref={dialog}>
      <div className={"modal-box text-center text-base-content bg-base-100 border-base-content border" + ' ' + addClass}>
        { title && (
          <h3 className="font-bold text-lg mb-4">{ title }</h3>
        )}
        { text && (
          <p className="mb-4">
            { text }
          </p>
        )}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeHandler} >✕</button>
        { children }
      </div>
      <form method="dialog" className="modal-backdrop">
        <button
          onClick={closeHandler}
        >
          close
        </button>
      </form>
    </dialog>
  );
}
