import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const FeedbackContext = createContext(null);

export function FeedbackProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [modal, setModal] = useState(null);
  const dialogRef = useRef(null);
  const proximoId = useRef(0);

  // ---------- Toast ----------

  const fecharToast = useCallback((id) => {
    setToasts((lista) => lista.filter((toast) => toast.id !== id));
  }, []);

  // tipo: "sucesso", "erro", "aviso" ou "info"
  const mostrarToast = useCallback(
    (mensagem, tipo = "sucesso", duracao = 6000) => {
      proximoId.current += 1;
      const id = proximoId.current;
      setToasts((lista) => [...lista, { id, mensagem, tipo }]);
      setTimeout(() => fecharToast(id), duracao);
    },
    [fecharToast]
  );

  // ---------- Modal de confirmação ----------

  // Abre o modal e devolve uma promessa: true (confirmou) ou false (cancelou)
  const confirmar = useCallback((opcoes) => {
    return new Promise((resolve) => {
      setModal({
        titulo: "Confirmar",
        mensagem: "",
        textoConfirmar: "Confirmar",
        textoCancelar: "Cancelar",
        ...opcoes,
        resolver: resolve,
      });
    });
  }, []);

  // Quando há um modal para mostrar, abre o <dialog>
  useEffect(() => {
    const dialog = dialogRef.current;
    if (modal && dialog && !dialog.open) {
      dialog.showModal();
    }
  }, [modal]);

  function responder(resposta) {
    dialogRef.current?.close();
    modal?.resolver(resposta);
    setModal(null);
  }

  return (
    <FeedbackContext.Provider value={{ mostrarToast, confirmar }}>
      {children}

      {/* Toasts */}
      <div id="toasts" className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast--${toast.tipo}`}
            role={toast.tipo === "erro" ? "alert" : "status"}
          >
            <span>{toast.mensagem}</span>
            <button
              type="button"
              className="toast__fechar"
              aria-label="Fechar notificação"
              onClick={() => fecharToast(toast.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      <dialog
        ref={dialogRef}
        className="modal"
        aria-labelledby="modal-titulo"
        onCancel={(evento) => {
          // Tecla Esc: conta como "Cancelar"
          evento.preventDefault();
          responder(false);
        }}
      >
        {modal && (
          <>
            <div className="modal__cabecalho">
              <h2 id="modal-titulo">{modal.titulo}</h2>
            </div>
            <div className="modal__corpo">
              <p>{modal.mensagem}</p>
            </div>
            <div className="modal__rodape">
              <button
                type="button"
                className="botao--secundario"
                onClick={() => responder(false)}
              >
                {modal.textoCancelar}
              </button>
              <button
                type="button"
                className="botao--primario"
                onClick={() => responder(true)}
              >
                {modal.textoConfirmar}
              </button>
            </div>
          </>
        )}
      </dialog>
    </FeedbackContext.Provider>
  );
}

// Atalho para as páginas usarem: const { mostrarToast, confirmar } = useFeedback();
// eslint-disable-next-line react-refresh/only-export-components
export function useFeedback() {
  const contexto = useContext(FeedbackContext);
  if (!contexto) {
    throw new Error("useFeedback precisa estar dentro do FeedbackProvider.");
  }
  return contexto;
}