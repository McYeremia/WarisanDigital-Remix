// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Interface standar token ERC20
interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
}

contract WarisanDigital {
    // Informasi dasar
    address public pemberiWaris;
    address public notaris;
    address public saksi;

    uint256 public waktuBukaWarisan;
    address public tokenAddress;
    uint256 public jumlahToken;

    // Mapping untuk ahli waris dan bagian warisannya
    mapping(address => uint256) public bagianAhliWaris;
    address[] public daftarAhliWaris;

    bool public warisanDibuka = false;

    // Event
    event WarisanDibuat(address pemberiWaris, address notaris, address saksi);
    event WarisanDibuka();
    event TokenDiberikan(address ahliWaris, uint256 jumlah);

    modifier hanyaNotaris() {
        require(msg.sender == notaris, "Hanya notaris yang bisa melakukan ini");
        _;
    }

    modifier hanyaJikaWaktuSudahTiba() {
        require(block.timestamp >= waktuBukaWarisan, "Waktu pembukaan belum tiba");
        _;
    }

    constructor(
        address _notaris,
        address _saksi,
        address _tokenAddress,
        uint256 _jumlahToken,
        uint256 _waktuBuka
    ) {
        pemberiWaris = msg.sender;
        notaris = _notaris;
        saksi = _saksi;
        tokenAddress = _tokenAddress;
        jumlahToken = _jumlahToken;
        waktuBukaWarisan = _waktuBuka;

        emit WarisanDibuat(pemberiWaris, notaris, saksi);
    }

    function tambahAhliWaris(address _ahliWaris, uint256 _bagian) public {
        require(msg.sender == pemberiWaris, "Hanya pemberi waris");
        require(_bagian > 0, "Bagian harus lebih dari 0");
        bagianAhliWaris[_ahliWaris] = _bagian;
        daftarAhliWaris.push(_ahliWaris);
    }

    function bukaWarisan() public hanyaNotaris hanyaJikaWaktuSudahTiba {
        require(!warisanDibuka, "Warisan sudah dibuka");
        warisanDibuka = true;

        IERC20 token = IERC20(tokenAddress);
        for (uint256 i = 0; i < daftarAhliWaris.length; i++) {
            address ahli = daftarAhliWaris[i];
            uint256 bagian = bagianAhliWaris[ahli];
            require(token.transfer(ahli, bagian), "Transfer token gagal");
            emit TokenDiberikan(ahli, bagian);
        }

        emit WarisanDibuka();
    }

    function lihatPenandatangan() public view returns (address, address, address) {
        return (pemberiWaris, notaris, saksi);
    }
}
