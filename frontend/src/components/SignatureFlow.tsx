import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';

export interface FlowStep {
    label: string;
    completed: boolean;
    active?: boolean;
}

interface SignatureFlowProps {
    steps: FlowStep[];
}

const SignatureFlow: React.FC<SignatureFlowProps> = ({ steps }) => {
    return (
        <div className="bg-gray-800/20 rounded-xl border border-gray-700 p-6">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Signature Flow</h4>

            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <React.Fragment key={index}>
                        <div className="flex flex-col items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${step.completed
                                    ? 'bg-green-500 text-white'
                                    : step.active
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-gray-700 text-gray-400'
                                }`}>
                                {step.completed ? (
                                    <CheckCircle2 size={20} />
                                ) : (
                                    <Circle size={20} />
                                )}
                            </div>
                            <span className={`text-xs font-medium ${step.completed || step.active ? 'text-white' : 'text-gray-500'
                                }`}>
                                {step.label}
                            </span>
                        </div>

                        {index < steps.length - 1 && (
                            <ArrowRight
                                size={20}
                                className={`mx-2 ${steps[index + 1].completed || steps[index + 1].active
                                        ? 'text-purple-400'
                                        : 'text-gray-600'
                                    }`}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default SignatureFlow;
