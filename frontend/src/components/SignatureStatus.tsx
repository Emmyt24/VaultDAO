import React from 'react';
import { CheckCircle2, Clock, Download, Bell } from 'lucide-react';

export interface Signer {
    address: string;
    name?: string;
    signed: boolean;
    timestamp?: string | null;
    verified?: boolean;
}

interface SignatureStatusProps {
    signers: Signer[];
    threshold: number;
    onRemind?: (address: string) => void;
    onExport?: () => void;
}

const SignatureStatus: React.FC<SignatureStatusProps> = ({ signers, threshold, onRemind, onExport }) => {
    const signedCount = signers.filter(s => s.signed).length;
    const progress = (signedCount / threshold) * 100;

    return (
        <div className="space-y-4">
            {/* Progress Bar */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Signature Progress</span>
                    <span className="text-xs font-bold text-purple-400">{signedCount}/{threshold}</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                </div>
            </div>

            {/* Signers List */}
            <div className="bg-gray-800/20 rounded-xl border border-gray-700 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-700 bg-gray-800/50 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Signers</span>
                    {onExport && (
                        <button
                            onClick={onExport}
                            className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            <Download size={14} />
                            Export
                        </button>
                    )}
                </div>

                <div className="divide-y divide-gray-700">
                    {signers.map((signer, index) => (
                        <div key={index} className="px-4 py-3 flex items-center justify-between hover:bg-gray-800/30 transition-colors">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                {signer.signed ? (
                                    <CheckCircle2 size={18} className="text-green-400 flex-shrink-0" />
                                ) : (
                                    <Clock size={18} className="text-gray-500 flex-shrink-0" />
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">
                                        {signer.name || `${signer.address.slice(0, 4)}...${signer.address.slice(-4)}`}
                                    </p>
                                    {signer.timestamp && (
                                        <p className="text-xs text-gray-500">
                                            {new Date(signer.timestamp).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {!signer.signed && onRemind && (
                                <button
                                    onClick={() => onRemind(signer.address)}
                                    className="flex items-center gap-1 px-3 py-1 text-xs text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                                >
                                    <Bell size={12} />
                                    Remind
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SignatureStatus;
