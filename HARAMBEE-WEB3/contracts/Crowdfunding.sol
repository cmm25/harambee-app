// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding{
    struct Campaign{
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 raisedAmount;
        string image;
        address[] contributors;
        uint256[] contributions;
    } 

    mapping (uint256 => Campaign) public campaigns; 
    uint256 public campaignCount = 0;
    
    // functions that determine the business logic of the contract

    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target,
     uint256 _deadline, string memory _image ) public returns(uint256) {
        Campaign storage campaign = campaigns[campaignCount];

        // check if the deadline is in the future - test

        require(campaign.deadline < block.timestamp, "Deadline must be in the future");
        
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.image = _image;
        campaign.raisedAmount = 0;

        campaignCount++;

        return campaignCount - 1;


     }  
    function contribute(uint256 _id) public payable  {
        uint256 amount = msg.value;
        Campaign storage campaign  = campaigns[_id];

        campaign.contributors.push(msg.sender);
        campaign.contributions.push(amount);

        // the transaction.
        (bool sent, ) = payable(campaign.owner).call{value:amount}("");

        if(sent){
            campaign.raisedAmount = campaign.raisedAmount + amount;
        }


    }
    function getContributors(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return(campaigns[_id].contributors, campaigns[_id].contributions);
    }

    function getCampaigns() public view returns (Campaign[] memory)  {
        //need to return all the campaigns
        Campaign[] memory allCampaigns =  new Campaign[](campaignCount); 
        // fetching a specific campaign from storage and mapping it to the allCampaigns array
        for(uint i = 0; i<campaignCount; i++){
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }
    
}