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
            isCreateNewCourse
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
          onChange={onChangeSubjectField}
        />
        <InputWithErrorField
          {...commonInputFieldProps}
          labelID="EditCourseModal.input.number.label"
          placeholderID="EditCourseModal.input.number.placeholder"
          name="number"
          value={course.number}
          onChange={onChangeNumberField}
        />
        <InputWithErrorField
          {...commonInputFieldProps}
          labelID="EditCourseModal.input.title.label"
          placeholderID="EditCourseModal.input.title.placeholder"
          name="title"
          value={course.title}
          onChange={onChangeTitleField}
        />
        <div className={styles.label}>
          <FormattedMessage id="EditCourseModal.input.description.label" />
        </div>
        <TextArea
          className={styles.textarea}
          value={course.description}
          onChange={onChangeDescriptionField}
        />
        <div className={styles.label}>
          <FormattedMessage id="EditCourseModal.input.learning-outcome.label" />
        </div>
        <TextArea
          className={styles.textarea}
          value={course.learningOutcome}
          onChange={onChangeLearningOutcomeField}
        />
        <div className={styles.label}>
          <FormattedMessage id="EditCourseModal.input.syllabus.label" />
        </div>
        <TextArea
          className={styles.textarea}
          value={course.syllabus}
          onChange={onChangeSyllabusField}
        />
        <div className={styles.label}>
          <FormattedMessage id="EditCourseModal.input.required-readings.label" />
        </div>
        <TextArea
          className={styles.textarea}
          value={course.requiredReadings}
          onChange={onChangeRequiredReadingsField}
        />
        <div className={styles.label}>
          <FormattedMessage id="EditCourseModal.input.recommended-readings.label" />
        </div>
        <TextArea
          className={styles.textarea}
          value={course.recommendedReadings}
          onChange={onChangeRecommendedReadingsField}
        />
        <Button color="green" onClick={onSave} loading={loading}>
          <FormattedMessage id="EditCourseModal.save-button.label" />
        </Button>
      </Modal.Content>
    </Modal>
  );
};

export default EditCourseModal;
