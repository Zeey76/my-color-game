import { Check, AlertCircle } from "lucide-react"
const StatusMessage = ({isCorrect, gameStatus, }) => {
  return (
    <div
                data-testid="gameStatus"
                className={`status-message ${
                  isCorrect ? "success animate-bounce" : "error animate-shake"
                }`}
              >
                {isCorrect ? (
                  <Check size={24} style={{ marginRight: "0.5rem" }} />
                ) : (
                  <AlertCircle size={24} style={{ marginRight: "0.5rem" }} />
                )}
                <span>{gameStatus}</span>
              </div>
  )
}

export default StatusMessage
