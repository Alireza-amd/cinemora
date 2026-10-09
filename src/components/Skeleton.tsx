import { Fragment, type ReactNode } from "react";

type SkeletonArray = {
  children: ReactNode;
  length: number;
};
export function SkeletonArray({ children, length }: SkeletonArray) {
  return Array.from({ length }).map((_, index) => (
    <Fragment key={index}>{children}</Fragment>
  ));
}
