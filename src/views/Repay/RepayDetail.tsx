import React from 'react';
import styled from 'styled-components';
import { useRouteMatch } from "react-router-dom";
import Page from '../../components/Page';
import { useAsset } from "../../hooks/asset";
import { useBalance } from "../../hooks/balance";
import RepayOverview from './RepayOverview';
import { ActionDetail } from "../../components/Actions/ActionDetail";

const RepayDetailWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  .content-wrapper {
    padding: 15px 0px;
    margin: 20px 0px 10px;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 0%;
    background: ${props => props.theme.color.bgWhite};

    .basic-form {
      max-width: 500px;
      margin: 0px auto;

      .basic-form-header {
        margin-bottom: 30px;
        text-align: center;
        width: 100%;
        overflow: hidden;

        .basic-form-header-title {
          width: 100%;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 10px;
          color: ${props => props.theme.color.pink};
        }

        .basic-form-header-content {
          font-size: 16px;
          text-align: center;
          color: ${props => props.theme.color.textPrimary};
        }
      }

      .basic-form-content {
        width: 335px;
        padding-bottom: 25px;
        margin: 0px auto;

        .basic-form-content-top {
          display: flex;
          flex-flow: row wrap;
          align-items: flex-start;
          justify-content: space-between;
          font-size: 14px;
          margin-bottom: 5px;
          color: ${props => props.theme.color.textPrimary};

          .basic-form-content-top-label {
            color: ${props => props.theme.color.textPrimary};
            font-weight: 400;
            font-size: 14px;
          }

          .basic-form-content-top-value {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            flex: 1 1 0%;
            color: ${props => props.theme.color.textPrimary};

            span {
              font-weight: 600;
              margin-right: 5px;
            }
          }
        }

        .basic-form-content-body {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0px 15px;
          border-radius: 2px;
          transition: all 0.2s ease 0s;
          border: 1px solid ${props => props.theme.color.bgSecondary};

          .image-section {
            padding-right: 10px;
          }

          .input-section {
            width: 100%;
            input {
              border: none;
              background: transparent;
              font-family: roboto-font, sans-serif;
              transition: all 0.2s ease 0s;
              font-size: 16px;
              width: 100%;
              padding: 13px 5px 13px 0px;
              appearance: none;
              box-shadow: none;
              outline: none;
              opacity: 1;
              color: ${props => props.theme.color.textPrimary};

              &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
            }
          }

          .max-section {
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            color: ${props => props.theme.color.pink};
            transition: all 0.2s ease 0s;

            &:hover {
              opacity: 0.7;
            }
          }
        }
      }

      .basic-form-footer {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 80px;
      }
    }
  }
`;

const RepayDetail: React.FC = () => {
  const match = useRouteMatch<{
    assetName: string | undefined,
  }>();
  const assetName = match.params.assetName;
  const { asset } = useAsset(assetName);
  const { library, address, balance } = useBalance(asset);
  if (!asset) {
    return <>No asset found with details </>;
  }

  if (!address || !library) {
    return <>No account loaded</>;
  }

  return (
    <Page>
      <RepayDetailWrapper>
        <RepayOverview asset={asset} />
        <ActionDetail asset={asset} balance={balance} actionName="repay" actionBaseRoute="repay" />
      </RepayDetailWrapper>
    </Page>
  );
};
/*
  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  const handleRepay = () => {
    if (!amount) {
      NotificationManager.error('Please input the correct amount');
      return;
    }
    history.push(`/repay/confirm/${asset.name}/${amount}`);
  };
*/


/*
  return (
    <Page>
      <RepayDetailWrapper>
        <RepayOverview asset={asset} />
        <div className="content-wrapper">
          <div className="basic-form">
            <div className="basic-form-header">
              <div className="basic-form-header-title">
                Repay
              </div>
              <div className="basic-form-header-content">
                How much do you want to repay?
              </div>
            </div>
            <div className="basic-form-content">
              <div className="basic-form-content-top">
                <div className="basic-form-content-top-label">
                  Available to repay
                </div>
                <div className="basic-form-content-top-value">
                  <span>{asset.borrow_balance}</span> {asset.name}
                </div>
              </div>
              <div className="basic-form-content-body">
                <div className="image-section">
                  <img src={asset.img} alt="" width={30} height={30} />
                </div>
                <div className="input-section">
                  <input type="number" placeholder="Amount" step="any" min="0" max={asset.borrow_balance} value={amount} onChange={handleInputChange} />
                </div>
                <div className="max-section" onClick={() => setAmount(asset.borrow_balance)}>
                  Max
                </div>
              </div>
            </div>
            <div className="basic-form-footer">
              <Button variant="secondary" onClick={handleRepay}>Continue</Button>
              <Button variant="outline" onClick={() => history.goBack()}>Go back</Button>
            </div>
          </div>
        </div>
      </RepayDetailWrapper>
    </Page>
  );
} */

export default RepayDetail;
