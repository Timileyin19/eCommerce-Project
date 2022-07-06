import styled from "@emotion/styled";

export const CollectionWrapper = styled.div`
  .collection-page {
    display: flex;
    flex-direction: column;

    .title {
      font-size: 38px;
      margin: 0 auto 30px;
    }

    .items {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 10px;

      & .collection-item {
        margin-bottom: 30px;
      }
    }
  }
`;
