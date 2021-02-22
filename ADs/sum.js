var fs = require("fs");
var request = require("request");
var urls = [
  "https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%203/Provider/Reject.list",
  "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanProgramAD.list",
  "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyListChina.list",
  "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyList.list",
  "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanAD.list",
  "https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Tide.list",
  "https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Liby.list",
  "https://raw.githubusercontent.com/eHpo1/Rules/master/QuantumultX/Filter/Liby.txt",
  "https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Guard/Privacy.list",
  "https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Guard/Hijacking.list",
  "https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/Guard/Advertising.list",
  "https://raw.githubusercontent.com/787a68/Rules/master/Surge4/Ruleset/Tide.list",
  "https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Custom/ad-domains.list",
  "https://raw.githubusercontent.com/Hackl0us/SS-Rule-Snippet/master/Rulesets/Surge/Custom/video-ad.list",
  "https://raw.githubusercontent.com/limbopro/Adblock4limbo/main/Adblock4limbo.list",
  "https://raw.githubusercontent.com/nzw9314/Surge/master/Ruleset/Tide.list",
  "https://raw.githubusercontent.com/privacy-protection-tools/anti-AD/master/anti-ad-surge.txt",
  "https://raw.githubusercontent.com/scomper/surge-list/master/adblock.list",
  "https://raw.githubusercontent.com/scomper/surge-list/master/reject.list",
  "https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/AdRule.list",
  "https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/AdRuleTest.list",
  "https://raw.githubusercontent.com/NobyDa/ND-AD/master/QuantumultX/AD_Block.txt",
  "https://raw.githubusercontent.com/NobyDa/ND-AD/master/QuantumultX/AD_Block_Plus.txt",
  "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/Advertising/Advertising.list",
  "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/AdvertisingTest/AdvertisingTest.list",
  "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/QuantumultX/AdvertisingLite/AdvertisingLite.list",
];
for (var i = 0; i < urls.length; i++) {
  const url = urls[i];
  request(url, function (error, response, body) {
 
    if (!error && response.statusCode == 200) {
      fs.appendFile("SumADsReject.txt", "\r\n" + body, (error) => {
        if (error) return console.log(url + "==添加失败" + error.message);
        console.log(url + "==添加成功");
        return;
      });
    } else {
      console.log(url + "==添加失败");
      return;
    }
  });
}
console.log("共计" + urls.length + "个链接文件！");

