import React, { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Modal, TextArea } from "semantic-ui-react";
import { useTextAreaChange, useTextFieldChange } from "../../hooks/component";
import type { Error } from "../../trpc";
import { Course } from "../../types";
import InputWithErrorField from "../InputWithErrorField";

import styles from "./styles.module.css";

interface EditCourseModalProps {
  loading: boolean;
  error: Error | null;
  isCreateNewCourse: boolean;
  isReadOnly: boolean;
  isOpen: boolean;
  course: Course;
  onChangeSubject: (value: string) => void;
  onChangeNumber: (value: string) => void;
  onChangeTitle: (value: string) => void;
  onChangeDescription: (value: string) => void;
  onChangeLearningOutcome: (value: string) => void;
  onChangeSyllabus: (value: string) => void;
  onChangeRequiredReadings: (value: string) => void;
  onChangeRecommendedReadings: (value: string) => void;
  onSave: () => void;
  onClose: () => void;
}

const EditCourseModal: React.FC<EditCourseModalProps> = (props) => {
  const {
    loading,
    error,
    isCreateNewCourse = false,
    isReadOnly = false,
    isOpen,
    course,
    onChangeSubject,
    onChangeNumber,
    onChangeTitle,
    onChangeDescription,
    onChangeLearningOutcome,
    onChangeSyllabus,
    onChangeRequiredReadings,
    onChangeRecommendedReadings,
    onSave,
    onClose,
  } = props;

  const onChangeSubjectField = useTextFieldChange(onChangeSubject);
  const onChangeNumberField = useTextFieldChange(onChangeNumber);
  const onChangeTitleField = useTextFieldChange(onChangeTitle);
  const onChangeDescriptionField = useTextAreaChange(onChangeDescription);
  const onChangeLearningOutcomeField = useTextAreaChange(
    onChangeLearningOutcome
  );
  const onChangeSyllabusField = useTextAreaChange(onChangeSyllabus);
  const onChangeRequiredReadingsField = useTextAreaChange(
    onChangeRequiredReadings
  );
  const onChangeRecommendedReadingsField = useTextAreaChange(
    onChangeRecommendedReadings
  );

  const commonInputFieldProps = useMemo(
    () => ({
      loading,
      focus: true,
      errorData: error,
    }),
    [error, loading]
  );

  return (
    <Modal size="small" open={isOpen} onClose={onClose}>
      <Modal.Header>
        <FormattedMessage
          id={
            isReadOnly
              ? "EditCourseModal.header.course-details"
              : isCreateNewCourse
              ? "EditCourseModal.header.create-course"
              : "EditCourseModal.header.edit-course"
          }
        />
      </Modal.Header>
      <Modal.Content>
        <InputWithErrorField
          {...commonInputFieldProps}
          labelID="EditCourseModal.input.subject.label"
          placeholderID="EditCourseModal.input.subject.placeholder"
          name="subject"
          value={course.subject}
          onChange={isReadOnly ? undefined : onChangeSubjectField}
        />
        <InputWithErrorField
          {...commonInputFieldProps}
          labelID="EditCourseModal.input.number.label"
          placeholderID="EditCourseModal.input.number.placeholder"
          name="number"
          value={course.number}
          onChange={isReadOnly ? undefined : onChangeNumberField}
        />
        <InputWithErrorField
          {...commonInputFieldProps}
          labelID="EditCourseModal.input.title.label"
          placeholderID="EditCourseModal.input.title.placeholder"
          name="title"
          value={course.title}
          onChange={isReadOnly ? undefined : onChangeTitleField}
        />
        <div className={styles.label}>
          <FormattedMessage id="EditCourseModal.input.description.label" />
        </div>
        <TextArea
          className={styles.textarea}
          value={course.description}
          onChange={isReadOnly ? undefined : onChangeDescriptionField}
        />
        <div className={styles.label}>
          <FormattedMessage id="EditCourseModal.input.learning-outcome.label" />
        </div>
        <TextArea
          className={styles.textarea}
          value={course.learningOutcome}
          onChange={isReadOnly ? undefined : onChangeLearningOutcomeField}
        />
        <div className={styles.label}>
          <FormattedMessage id="EditCourseModal.input.syllabus.label" />
        </div>
        <TextArea
          className={styles.textarea}
          value={course.syllabus}
          onChange={isReadOnly ? undefined : onChangeSyllabusField}
        />
        <div className={styles.label}>
          <FormattedMessage id="EditCourseModal.input.required-readings.label" />
        </div>
        <TextArea
          className={styles.textarea}
          value={course.requiredReadings}
          onChange={isReadOnly ? undefined : onChangeRequiredReadingsField}
        />
        <div className={styles.label}>
          <FormattedMessage id="EditCourseModal.input.recommended-readings.label" />
        </div>
        <TextArea
          className={styles.textarea}
          value={course.recommendedReadings}
          onChange={isReadOnly ? undefined : onChangeRecommendedReadingsField}
        />
        {!isReadOnly && (
          <Button color="green" onClick={onSave} loading={loading}>
            <FormattedMessage id="EditCourseModal.save-button.label" />
          </Button>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default EditCourseModal;
