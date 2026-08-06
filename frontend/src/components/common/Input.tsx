import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/helpers';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className="space-y-1">
                {label && <label className="block text-sm font-medium text-brand-navy">{label}</label>}
                <input
                    ref={ref}
                    className={cn(
                        'w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base transition-colors focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20',
                        error && 'border-red-500 focus:border-red-500',
                        className
                    )}
                    {...props}
                />
                {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
        );
    }
);