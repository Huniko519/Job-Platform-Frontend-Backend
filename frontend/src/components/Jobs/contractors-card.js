import React from 'react'
import styled from 'styled-components';
import ContractorCardOne from '../cards/contractor-card-one';

const ContractorsCard = (props) => {

    return (
        <ContractorsCardWrapper>
            {props.contractors.map((contractor, idx) => {
                return (
                    <ContractorCardOne data={contractor} key={idx}/>
                )
            })}
        </ContractorsCardWrapper>
    )
}

const ContractorsCardWrapper = styled.div`
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 100%;
`;
export default ContractorsCard
