import React from 'react'
import styled from 'styled-components';
import theme from '../../theme';
import {FaPhone, FaEnvelope, FaTimes} from 'react-icons/fa';
import {Button} from 'reactstrap';

const ContractorCardOne = ({data}) => {

    return (
        <CardWrapper>
            <span className='delete'><FaTimes /></span>
            <img src={data.avatar} alt={data.name} />
            <p className="name">{data.name}</p>
            <span className="position">{data.position}</span>
            <p className="phone"><FaPhone />{data.phone}</p>
            <p className="email"><FaEnvelope />{data.email}</p>
            <Button color='secondary'>Change</Button>
        </CardWrapper>
    )
}
const CardWrapper = styled.div`
    width: calc(25% - 20px);
    padding: 10px;
    background: ${theme.colors.white};
    border-radius: 5px;
    position: relative;
    text-align: center;
    .delete {
        padding: 10px;
        position: absolute;
        right: 5px;
        top: 2px;
        &:hover {
            cursor: pointer;
            color: ${theme.colors.primary};
        }
    }
    img {
        border-radius: 50%;
        width: 70px;
        height: 70px;
    }
    .name {
        font-size: ${theme.fontSizes.placeholder};
        font-weight: ${theme.fontWeights.bold};
        color: ${theme.colors.primary};
        margin-top: 5px;
    }
    .position {
        padding: 5px 10px;
        background: ${theme.colors.gray150};
        border-radius: 10px;
    }
    .phone, .email {
        text-align: left;
        margin-left: 15px;
        svg {
            margin-right: 10px;
        }
    }
    .phone {
        margin-top: 20px;
    }
`

export default ContractorCardOne
