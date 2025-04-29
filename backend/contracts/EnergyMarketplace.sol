// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EnergyMarketplace {
    struct Offer {
        address seller;
        uint256 amountKWh;
        uint256 priceWei;
        bool active;
    }

    Offer[] public offers;

    function createOffer(uint256 _amountKWh, uint256 _priceWei) external {
        offers.push(Offer({
            seller: msg.sender,
            amountKWh: _amountKWh,
            priceWei: _priceWei,
            active: true
        }));
    }

    function buyEnergy(uint256 _offerId) external payable {
        Offer storage offer = offers[_offerId];
        require(offer.active, "Offer not active");
        require(msg.value >= offer.priceWei, "Not enough ETH sent");

        offer.active = false;
        payable(offer.seller).transfer(offer.priceWei);
    }

    function getOffersCount() external view returns (uint256) {
        return offers.length;
    }
}