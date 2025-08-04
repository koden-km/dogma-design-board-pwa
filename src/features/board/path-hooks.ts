import { useMemo } from "react";
import type {
  ConceptPath,
  DomainPath,
  Id,
  IOGroupPath,
  OperatorGroupPath,
  TimelinePath,
  TimePointPath,
} from "./types";

export const useDomainPath = (domainId: Id) => {
  return useMemo<DomainPath>(() => ({ domainId }), [domainId]);
};

export const useTimelinePath = (parentPath: DomainPath, timelineId: Id) => {
  return useMemo<TimelinePath>(
    () => ({
      ...parentPath,
      timelineId,
    }),
    [parentPath, timelineId]
  );
};

export const useConceptPath = (parentPath: TimelinePath, conceptId: Id) => {
  return useMemo<ConceptPath>(
    () => ({
      ...parentPath,
      conceptId,
    }),
    [conceptId, parentPath]
  );
};

export const useTimePointPath = (parentPath: ConceptPath, timePointId: Id) => {
  return useMemo<TimePointPath>(
    () => ({
      ...parentPath,
      timePointId,
    }),
    [timePointId, parentPath]
  );
};

export const useOperatorGroupPath = (
  parentPath: TimePointPath,
  opGroupId: Id
) => {
  return useMemo<OperatorGroupPath>(
    () => ({ ...parentPath, opGroupId }),
    [parentPath, opGroupId]
  );
};

export const useIOGroupPath = (
  parentPath: OperatorGroupPath,
  ioGroupId: Id
) => {
  return useMemo<IOGroupPath>(
    () => ({
      ...parentPath,
      ioGroupId,
    }),
    [ioGroupId, parentPath]
  );
};
