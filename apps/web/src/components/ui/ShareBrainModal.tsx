import { useState } from "react";
import Button from "./Button";
import { api } from "../../api";

export function ShareBrainModal({
    opened,
    onClose
}: {
    opened: boolean;
    onClose: () => void;
}) {
    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(false);

    async function generateLink() {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");
            if (!token) {
                return {
                    success: false,
                    message: "Please login again"
                };
            }
            const response = await api.post(
                "/user/start_sharing_brain",
                {},
                {
                    headers: {
                        token: token
                    }
                }
            );

            setLink(response.data.link);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    if (!opened) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-slate-500/70 flex justify-center items-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-8 rounded-2xl border relative w-[400px]"
            >
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 cursor-pointer"
                >
                    ✕
                </button>

                <h2 className="text-xl font-semibold mb-4">
                    Share Brain
                </h2>

                {!link ? (
                    <Button
                        text={loading ? "Generating..." : "Generate Link"}
                        variant="primary"
                        onClick={generateLink}
                    />
                ) : (
                    <div className="flex gap-2">
                        <input
                            value={link}
                            readOnly
                            className="border rounded px-2 py-2 text-sm flex-1"
                        />

                        <button
                            onClick={() => navigator.clipboard.writeText(link)}
                            className="border rounded px-3 cursor-pointer"
                        >
                            Copy
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}