import * as React from "react";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const ToastProvider = React.forwardRef(
  ({ ...props }, ref) => (
    <div
      ref={ref}
      className="fixed inset-x-0 top-0 z-[200] flex max-h-screen w-full flex-col-reverse p-3 sm:bottom-0 sm:left-auto sm:right-0 sm:top-auto sm:w-auto sm:flex-col sm:p-4 md:max-w-[420px]"
      {...props}
    />
  )
);

ToastProvider.displayName = "ToastProvider";

const ToastViewport = React.forwardRef(
  ({ ...props }, ref) => (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-x-0 top-0 z-[200] flex max-h-screen w-full flex-col-reverse p-3 sm:bottom-0 sm:left-auto sm:right-0 sm:top-auto sm:w-auto sm:flex-col sm:p-4 md:max-w-[420px]"
      {...props}
    />
  )
);

ToastViewport.displayName = "ToastViewport";

const toastVariants = cva(
  `
    group
    pointer-events-auto
    relative
    flex
    w-full
    items-start
    justify-between
    gap-4
    overflow-hidden
    rounded-xl
    border
    p-5
    pr-14
    shadow-lg
    transition-all

    data-[swipe=cancel]:translate-x-0
    data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]
    data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
    data-[swipe=move]:transition-none

    data-[state=open]:animate-in
    data-[state=closed]:animate-out
    data-[state=closed]:fade-out-80
    data-[state=closed]:slide-out-to-right-full

    data-[state=open]:slide-in-from-top-full
    sm:data-[state=open]:slide-in-from-bottom-full
  `,
  {
    variants: {
      variant: {
        default:
          "border-stone bg-white text-midnight",

        destructive:
          "border-red-500 bg-red-500 text-white",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  }
);

const Toast = React.forwardRef(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        toastVariants({ variant }),
        className
      )}
      {...props}
    />
  )
);

Toast.displayName = "Toast";

const ToastAction = React.forwardRef(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        `
          inline-flex
          h-10
          shrink-0
          items-center
          justify-center
          rounded-md
          border
          bg-transparent
          px-3
          text-sm
          font-medium
          transition-colors
          hover:bg-black/5
          focus:outline-none
          focus:ring-2
          disabled:pointer-events-none
          disabled:opacity-50
        `,
        className
      )}
      {...props}
    />
  )
);

ToastAction.displayName = "ToastAction";

const ToastClose = React.forwardRef(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label="Close notification"
      className={cn(
        `
          absolute
          right-2
          top-2
          z-50
          flex
          h-11
          w-11
          touch-manipulation
          items-center
          justify-center
          rounded-lg
          text-current
          opacity-80
          transition-all

          hover:bg-black/10
          hover:opacity-100

          focus:outline-none
          focus:ring-2
          focus:ring-current
          focus:ring-offset-1

          group-[.destructive]:border
          group-[.destructive]:border-white/30
          group-[.destructive]:bg-white/10
          group-[.destructive]:text-white
          group-[.destructive]:hover:bg-white/20
        `,
        className
      )}
      toast-close=""
      {...props}
    >
      <X
        className="h-5 w-5"
        aria-hidden="true"
      />
    </button>
  )
);

ToastClose.displayName = "ToastClose";

const ToastTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "text-sm font-semibold leading-5",
        className
      )}
      {...props}
    />
  )
);

ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "text-sm leading-5 opacity-90",
        className
      )}
      {...props}
    />
  )
);

ToastDescription.displayName =
  "ToastDescription";

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};