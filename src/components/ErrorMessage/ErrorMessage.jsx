import s from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className={s.errorContainer}>
      <p className={s.errorMessage}>
        {message || 'Something went wrong. Please try again later.'}
      </p>
    </div>
  );
};

export default ErrorMessage;