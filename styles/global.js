import css from 'styled-jsx/css';

export default css.global`
  body {
    margin: 0;
    padding: 0;
    font-size: 20px;
    font-weight: 400;
    line-height: 1.7;
    color: #434343;
    font-family: 'Anonymous Pro for Powerline', sans-serif;
  }
  h1 {
    font-weight: 900;
    font-family: 'Bungee Inline', sans-serif;
  }
  pre {
    font-size: .7rem;
  }
  section.container {
    padding: 0 5rem;
  }
  section.container header h1 {
    padding: 0 5rem;
    color: #455667;
    font-weight: 900;
  }
  .app-header {
    background-color: #dedede;
    font-family: 'IBM 3270', sans-serif;
    font-size: 0.6rem;
    padding: 0.3rem;
    display: flex;
  }
  .app-header section {
    padding: 0 1rem;
  }
  section.row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    flex-wrap: wrap;
  }
  article {
    border: 0.01rem solid #454545;
    padding: 0 0.5rem;
    font-size: 0.6rem;
    margin: 0.3rem;
    width: 10rem;
    cursor: pointer;
  }
  article:hover {
    background-color: #dfdfdf;
  }
  p {
    margin-bottom: 0.5rem;
  }
  dl {
    max-width: 30rem;
  }
  dl dt {
    font-weight: 900;
  }
  button {
    border: 1px solid #12ff34;
    padding: 0.3rem 1rem;
  }
  footer {
    display: flex;
    justify-content: flex-end;
  }

  /*
    Blasting Ripple Styles
    borrowed from https://github.com/theanam/css-only-loaders
  */
  @keyframes blast-ripple {
    0% {
      top: calc(var(--loader-height, 100px) / 2 - var(--line-width, 4px));
      left: calc(var(--loader-width, 100px) / 2 - var(--line-width, 4px));
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: -1px;
      left: -1px;
      width: calc(var(--loader-width, 100px) - var(--line-width, 4px));
      height: calc(var(--loader-height, 100px) - var(--line-width, 4px));
      opacity: 0;
    }
  }
  .loader.blasting-ripple {
    position: relative;
    width: var(--loader-width, 100px);
    height: var(--loader-height, 100px);
  }
  .loader.blasting-ripple::after {
    opacity: 0;
    content: '';
    position: absolute;
    border: var(--line-width, 4px) solid var(--loader-color-primary, #a1a1a1);
    opacity: 1;
    border-radius: 50%;
    animation: blast-ripple var(--animation-duration, 1s)
      cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .loader.blasting-ripple::before {
    opacity: 0;
    top: calc(var(--loader-height, 100px) / 2 - var(--line-width, 4px));
    left: calc(var(--loader-width, 100px) / 2 - var(--line-width, 4px));
    content: '';
    position: absolute;
    border: var(--line-width, 4px) solid var(--loader-color-primary, #676767);
    opacity: 1;
    border-radius: 50%;
    animation: blast-ripple var(--animation-duration, 1s)
      cubic-bezier(0, 0.2, 0.8, 1) infinite;
    animation-delay: calc(var(--animation-duration, 1s) / 2);
  }
`;
