import css from 'styled-jsx/css';

export default css.global`
  body {
    margin: 0;
    padding: 0;
    font-size: 20px;
    font-weight: 400;
    line-height: 1.8;
    color: #434343;
    font-family: sans-serif;
  }
  h1 {
    font-weight: 900;
  }
  section.container header h1 {
    padding: 0 5rem;
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
    font-size: 0.4rem;
    margin: 0.3rem;
    width: 10rem;
  }
  p {
    margin-bottom: 0.5rem;
  }
`;
