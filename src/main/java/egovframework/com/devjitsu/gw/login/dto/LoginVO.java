package egovframework.com.devjitsu.gw.login.dto;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

public class LoginVO {
    private String id;
    private String name;
    private String ihidNum;
    private String email;
    private String password;
    private String passwordHint;
    private String passwordCnsr;
    private String userSe;
    private String orgnztId;
    private String orgnztNm;
    private String orgnztPath;
    private String uniqId;
    private String url;
    private String ip;
    private String dn;
    private String organId;
    private String organNm;
    private String classCode;
    private String classNm;
    private String positionCode;
    private String positionNm;
    private String dutyCode;
    private String dutyNm;
    private String authorCode;
    private String erpEmpCd;
    private String erpEmpNm;
    private String erpCoCd;
    private String empl_no;
    private String session_id;
    private String langCode;
    private String groupSeq;
    private String bizSeq;
    private String compSeq;
    private String picFileId;
    private String picFilePath;
    private String eaType;
    private String emailDomain;
    private String erpBizCd;
    private String erpDeptCd;
    private String licenseCheckYn;
    private String passwdChangeDate;
    private String lastLoginDateTime;
    private String displayDeptSeq;
    private String passwdStatusCode;
    private String teamYn;
    private String empid;
    private String empname;
    private String retire_yn;
    private String pos_cd;
    private String pos_nm;
    private String titlecode;
    private String telephonenumber;
    private String mobile;
    private Integer mail_quota;
    private String mbr_id;
    private String userId;
    private String mbr_name;
    private String access_ip;
    private String mbr_type;
    private Date last_login_date;
    private String mbr_image;
    private String empno;
    private String passwd;
    private String birthdateyear;
    private String birthdatemon;
    private String birthdateday;
    private String zipcode;
    private String addr;
    private String addrdetail;
    private String weddingdate;
    private String affiliated;
    private String nick_nm;
    private String profilepicture;
    private String intro;
    private String sl_cal;
    private String twitter_id;
    private String emp_id_number;
    private Date reg_date;
    private Integer age;
    private Integer ageCnt;
    private String address;
    private Integer areaCnt;
    private Integer affCnt;
    private String relation;
    private String family_name;
    private Integer cat_seq_no;
    private Integer posi_lvl;
    private String comp_id;
    private String biz_seq;
    private String dept_seq;
    private String use_yn;
    private String res_cd;
    private String res_nm;
    private Integer opr_seq_no;
    private String opr_id;
    private String opr_password;
    private String opr_name;
    private String phone_no;
    private String opr_email;
    private String opr_address;
    private String opr_type;
    private String opr_right;
    private String opr_tel_no;
    private Date opr_reg_date;
    private String opr_rights;
    private String deptId;
    private String teamId;
    private String deptNm;
    private String teamNm;
    private String gradeCode;
    private String gradeNm;

    private String jobDetailNm;
    private String engMa;


    public LoginVO() {
    }

    public String getEngMa() {
        return engMa;
    }

    public void setEngMa(String engMa) {
        this.engMa = engMa;
    }

    public String getPicFilePath() {
        return picFilePath;
    }

    public void setPicFilePath(String picFilePath) {
        this.picFilePath = picFilePath;
    }

    public String getPicFileId() {
        return this.picFileId;
    }

    public void setPicFileId(String picFileId) {
        this.picFileId = picFileId;
    }

    public String getLangCode() {
        return this.langCode;
    }

    public void setLangCode(String langCode) {
        this.langCode = langCode;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIhidNum() {
        return this.ihidNum;
    }

    public void setIhidNum(String ihidNum) {
        this.ihidNum = ihidNum;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordHint() {
        return this.passwordHint;
    }

    public void setPasswordHint(String passwordHint) {
        this.passwordHint = passwordHint;
    }

    public String getPasswordCnsr() {
        return this.passwordCnsr;
    }

    public void setPasswordCnsr(String passwordCnsr) {
        this.passwordCnsr = passwordCnsr;
    }

    public String getUserSe() {
        return this.userSe;
    }

    public void setUserSe(String userSe) {
        this.userSe = userSe;
    }

    public String getOrgnztId() {
        return this.orgnztId;
    }

    public void setOrgnztId(String orgnztId) {
        this.orgnztId = orgnztId;
    }

    public String getOrgnztNm() {
        return this.orgnztNm;
    }

    public void setOrgnztNm(String orgnztNm) {
        this.orgnztNm = orgnztNm;
    }

    public String getUniqId() {
        return this.uniqId;
    }

    public void setUniqId(String uniqId) {
        this.uniqId = uniqId;
    }

    public String getUrl() {
        return this.url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getIp() {
        return this.ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getDn() {
        return this.dn;
    }

    public void setDn(String dn) {
        this.dn = dn;
    }

    public String getOrganId() {
        return this.organId;
    }

    public void setOrganId(String organId) {
        this.organId = organId;
    }

    public String getOrganNm() {
        return this.organNm;
    }

    public void setOrganNm(String organNm) {
        this.organNm = organNm;
    }

    public String getClassCode() {
        return this.classCode;
    }

    public void setClassCode(String classCode) {
        this.classCode = classCode;
    }

    public String getClassNm() {
        return this.classNm;
    }

    public void setClassNm(String classNm) {
        this.classNm = classNm;
    }

    public String getPositionCode() {
        return this.positionCode;
    }

    public void setPositionCode(String positionCode) {
        this.positionCode = positionCode;
    }

    public String getPositionNm() {
        return this.positionNm;
    }

    public void setPositionNm(String positionNm) {
        this.positionNm = positionNm;
    }

    public String getDutyCode() {
        return this.dutyCode;
    }

    public void setDutyCode(String dutyCode) {
        this.dutyCode = dutyCode;
    }

    public String getDutyNm() {
        return this.dutyNm;
    }

    public void setDutyNm(String dutyNm) {
        this.dutyNm = dutyNm;
    }

    public String getAuthorCode() {
        return this.authorCode;
    }

    public void setAuthorCode(String authorCode) {
        this.authorCode = authorCode;
    }

    public String getErpEmpCd() {
        return this.erpEmpCd;
    }

    public void setErpEmpCd(String erpEmpCd) {
        this.erpEmpCd = erpEmpCd;
    }

    public String getErpEmpNm() {
        return this.erpEmpNm;
    }

    public void setErpEmpNm(String erpEmpNm) {
        this.erpEmpNm = erpEmpNm;
    }

    public String getErpCoCd() {
        return this.erpCoCd;
    }

    public void setErpCoCd(String erpCoCd) {
        this.erpCoCd = erpCoCd;
    }

    public String getEmpl_no() {
        return this.empl_no;
    }

    public void setEmpl_no(String empl_no) {
        this.empl_no = empl_no;
    }

    public Boolean isUserAuthor(String userAuthor) {
        List<String> authorList = this.selectUserAuthor();
        return authorList.contains(userAuthor);
    }

    public List<String> selectUserAuthor() {
        String[] authorArr = this.getAuthorCode().split("#");
        List<String> authorList = new ArrayList(Arrays.asList(authorArr));
        return authorList;
    }

    public String getSession_id() {
        return this.session_id;
    }

    public void setSession_id(String session_id) {
        this.session_id = session_id;
    }

    public String getGroupSeq() {
        return this.groupSeq;
    }

    public void setGroupSeq(String groupSeq) {
        this.groupSeq = groupSeq;
    }

    public String getBizSeq() {
        return this.bizSeq;
    }

    public void setBizSeq(String bizSeq) {
        this.bizSeq = bizSeq;
    }

    public String getCompSeq() {
        return this.compSeq;
    }

    public void setCompSeq(String compSeq) {
        this.compSeq = compSeq;
    }

    public static long getSerialversionuid() {
        return -8274004534207618049L;
    }

    public String toString() {
        return "id          : " + this.id + " / " + "name        : " + this.name + " / " + "ihidNum     : " + this.ihidNum + " / " + "email       : " + this.email + " / " + "password    : " + this.password + " / " + "passwordHint: " + this.passwordHint + " / " + "passwordCnsr: " + this.passwordCnsr + " / " + "userSe      : " + this.userSe + " / " + "orgnztId    : " + this.orgnztId + " / " + "orgnztNm    : " + this.orgnztNm + " / " + "uniqId      : " + this.uniqId + " / " + "url         : " + this.url + " / " + "ip          : " + this.ip + " / " + "dn          : " + this.dn + " / " + "organId     : " + this.organId + " / " + "organNm     : " + this.organNm + " / " + "classCode   : " + this.classCode + " / " + "classNm     : " + this.classNm + " / " + "positionCode: " + this.positionCode + " / " + "positionNm  : " + this.positionNm + " / " + "dutyCode: " + this.dutyCode + " / " + "dutyNm  : " + this.dutyNm + " / " + "authorCode  : " + this.authorCode + " / " + "erpEmpCd    : " + this.erpEmpCd + " / " + "erpEmpNm    : " + this.erpEmpNm + " / " + "erpCoCd     : " + this.erpCoCd + " / " + "empl_no     : " + this.empl_no + " / " + "session_id  : " + this.session_id + " / " + "langCode    : " + this.langCode + " / " + "groupSeq    : " + this.groupSeq + " / " + "bizSeq      : " + this.bizSeq + " / " + "compSeq     : " + this.compSeq + " / " + "picFileId   : " + this.picFileId + " / " + "eaType      : " + this.eaType + " / " + "emailDomain : " + this.emailDomain + " / " + "deptId : " + this.deptId + " / " + "deptNm : " + this.deptNm + " / " + "teamId : " + this.teamId + " / " + "teamNm : " + this.teamNm + " / " + "gradeCode : " + this.gradeCode + " / " + "gradeNm : " + this.gradeNm + " / " + "jobDetailNm : " + this.jobDetailNm + " / " + "passwd : " + this.passwd + " / ";
    }

    public String getEmpid() {
        return this.empid;
    }

    public void setEmpid(String empid) {
        this.empid = empid;
    }

    public String getEmpname() {
        return this.empname;
    }

    public void setEmpname(String empname) {
        this.empname = empname;
    }

    public String getRetire_yn() {
        return this.retire_yn;
    }

    public void setRetire_yn(String retire_yn) {
        this.retire_yn = retire_yn;
    }

    public String getPos_cd() {
        return this.pos_cd;
    }

    public void setPos_cd(String pos_cd) {
        this.pos_cd = pos_cd;
    }

    public String getPos_nm() {
        return this.pos_nm;
    }

    public void setPos_nm(String pos_nm) {
        this.pos_nm = pos_nm;
    }

    public String getTitlecode() {
        return this.titlecode;
    }

    public void setTitlecode(String titlecode) {
        this.titlecode = titlecode;
    }

    public String getTelephonenumber() {
        return this.telephonenumber;
    }

    public void setTelephonenumber(String telephonenumber) {
        this.telephonenumber = telephonenumber;
    }

    public String getMobile() {
        return this.mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Integer getMail_quota() {
        return this.mail_quota;
    }

    public void setMail_quota(Integer mail_quota) {
        this.mail_quota = mail_quota;
    }

    public String getMbr_id() {
        return this.mbr_id;
    }

    public void setMbr_id(String mbr_id) {
        this.mbr_id = mbr_id;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMbr_name() {
        return this.mbr_name;
    }

    public void setMbr_name(String mbr_name) {
        this.mbr_name = mbr_name;
    }

    public String getAccess_ip() {
        return this.access_ip;
    }

    public void setAccess_ip(String access_ip) {
        this.access_ip = access_ip;
    }

    public String getMbr_type() {
        return this.mbr_type;
    }

    public void setMbr_type(String mbr_type) {
        this.mbr_type = mbr_type;
    }

    public Date getLast_login_date() {
        return this.last_login_date;
    }

    public void setLast_login_date(Date last_login_date) {
        this.last_login_date = last_login_date;
    }

    public String getMbr_image() {
        return this.mbr_image;
    }

    public void setMbr_image(String mbr_image) {
        this.mbr_image = mbr_image;
    }

    public String getEmpno() {
        return this.empno;
    }

    public void setEmpno(String empno) {
        this.empno = empno;
    }

    public String getPasswd() {
        return this.passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    public String getBirthdateyear() {
        return this.birthdateyear;
    }

    public void setBirthdateyear(String birthdateyear) {
        this.birthdateyear = birthdateyear;
    }

    public String getBirthdatemon() {
        return this.birthdatemon;
    }

    public void setBirthdatemon(String birthdatemon) {
        this.birthdatemon = birthdatemon;
    }

    public String getBirthdateday() {
        return this.birthdateday;
    }

    public void setBirthdateday(String birthdateday) {
        this.birthdateday = birthdateday;
    }

    public String getZipcode() {
        return this.zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getAddr() {
        return this.addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }

    public String getAddrdetail() {
        return this.addrdetail;
    }

    public void setAddrdetail(String addrdetail) {
        this.addrdetail = addrdetail;
    }

    public String getWeddingdate() {
        return this.weddingdate;
    }

    public void setWeddingdate(String weddingdate) {
        this.weddingdate = weddingdate;
    }

    public String getAffiliated() {
        return this.affiliated;
    }

    public void setAffiliated(String affiliated) {
        this.affiliated = affiliated;
    }

    public String getNick_nm() {
        return this.nick_nm;
    }

    public void setNick_nm(String nick_nm) {
        this.nick_nm = nick_nm;
    }

    public String getProfilepicture() {
        return this.profilepicture;
    }

    public void setProfilepicture(String profilepicture) {
        this.profilepicture = profilepicture;
    }

    public String getIntro() {
        return this.intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public String getSl_cal() {
        return this.sl_cal;
    }

    public void setSl_cal(String sl_cal) {
        this.sl_cal = sl_cal;
    }

    public String getTwitter_id() {
        return this.twitter_id;
    }

    public void setTwitter_id(String twitter_id) {
        this.twitter_id = twitter_id;
    }

    public String getEmp_id_number() {
        return this.emp_id_number;
    }

    public void setEmp_id_number(String emp_id_number) {
        this.emp_id_number = emp_id_number;
    }

    public Date getReg_date() {
        return this.reg_date;
    }

    public void setReg_date(Date reg_date) {
        this.reg_date = reg_date;
    }

    public Integer getAge() {
        return this.age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getAgeCnt() {
        return this.ageCnt;
    }

    public void setAgeCnt(Integer ageCnt) {
        this.ageCnt = ageCnt;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getAreaCnt() {
        return this.areaCnt;
    }

    public void setAreaCnt(Integer areaCnt) {
        this.areaCnt = areaCnt;
    }

    public Integer getAffCnt() {
        return this.affCnt;
    }

    public void setAffCnt(Integer affCnt) {
        this.affCnt = affCnt;
    }

    public String getRelation() {
        return this.relation;
    }

    public void setRelation(String relation) {
        this.relation = relation;
    }

    public String getFamily_name() {
        return this.family_name;
    }

    public void setFamily_name(String family_name) {
        this.family_name = family_name;
    }

    public Integer getCat_seq_no() {
        return this.cat_seq_no;
    }

    public void setCat_seq_no(Integer cat_seq_no) {
        this.cat_seq_no = cat_seq_no;
    }

    public Integer getPosi_lvl() {
        return this.posi_lvl;
    }

    public void setPosi_lvl(Integer posi_lvl) {
        this.posi_lvl = posi_lvl;
    }

    public String getComp_id() {
        return this.comp_id;
    }

    public void setComp_id(String comp_id) {
        this.comp_id = comp_id;
    }

    public String getBiz_seq() {
        return this.biz_seq;
    }

    public void setBiz_seq(String biz_seq) {
        this.biz_seq = biz_seq;
    }

    public String getDept_seq() {
        return this.dept_seq;
    }

    public void setDept_seq(String dept_seq) {
        this.dept_seq = dept_seq;
    }

    public String getUse_yn() {
        return this.use_yn;
    }

    public void setUse_yn(String use_yn) {
        this.use_yn = use_yn;
    }

    public String getRes_cd() {
        return this.res_cd;
    }

    public void setRes_cd(String res_cd) {
        this.res_cd = res_cd;
    }

    public String getRes_nm() {
        return this.res_nm;
    }

    public void setRes_nm(String res_nm) {
        this.res_nm = res_nm;
    }

    public Integer getOpr_seq_no() {
        return this.opr_seq_no;
    }

    public void setOpr_seq_no(Integer opr_seq_no) {
        this.opr_seq_no = opr_seq_no;
    }

    public String getOpr_id() {
        return this.opr_id;
    }

    public void setOpr_id(String opr_id) {
        this.opr_id = opr_id;
    }

    public String getOpr_password() {
        return this.opr_password;
    }

    public void setOpr_password(String opr_password) {
        this.opr_password = opr_password;
    }

    public String getOpr_name() {
        return this.opr_name;
    }

    public void setOpr_name(String opr_name) {
        this.opr_name = opr_name;
    }

    public String getPhone_no() {
        return this.phone_no;
    }

    public void setPhone_no(String phone_no) {
        this.phone_no = phone_no;
    }

    public String getOpr_email() {
        return this.opr_email;
    }

    public void setOpr_email(String opr_email) {
        this.opr_email = opr_email;
    }

    public String getOpr_address() {
        return this.opr_address;
    }

    public void setOpr_address(String opr_address) {
        this.opr_address = opr_address;
    }

    public String getOpr_type() {
        return this.opr_type;
    }

    public void setOpr_type(String opr_type) {
        this.opr_type = opr_type;
    }

    public String getOpr_right() {
        return this.opr_right;
    }

    public void setOpr_right(String opr_right) {
        this.opr_right = opr_right;
    }

    public String getOpr_tel_no() {
        return this.opr_tel_no;
    }

    public void setOpr_tel_no(String opr_tel_no) {
        this.opr_tel_no = opr_tel_no;
    }

    public Date getOpr_reg_date() {
        return this.opr_reg_date;
    }

    public void setOpr_reg_date(Date opr_reg_date) {
        this.opr_reg_date = opr_reg_date;
    }

    public String getOpr_rights() {
        return this.opr_rights;
    }

    public void setOpr_rights(String opr_rights) {
        this.opr_rights = opr_rights;
    }

    public String getEaType() {
        return this.eaType;
    }

    public void setEaType(String eaType) {
        this.eaType = eaType;
    }

    public String getEmailDomain() {
        return this.emailDomain;
    }

    public void setEmailDomain(String emailDomain) {
        this.emailDomain = emailDomain;
    }

    public String getErpBizCd() {
        return this.erpBizCd;
    }

    public void setErpBizCd(String erpBizCd) {
        this.erpBizCd = erpBizCd;
    }

    public String getErpDeptCd() {
        return this.erpDeptCd;
    }

    public void setErpDeptCd(String erpDeptCd) {
        this.erpDeptCd = erpDeptCd;
    }

    public String getLicenseCheckYn() {
        return this.licenseCheckYn;
    }

    public void setLicenseCheckYn(String licenseCheckYn) {
        this.licenseCheckYn = licenseCheckYn;
    }

    public String getPasswdChangeDate() {
        return this.passwdChangeDate;
    }

    public void setPasswdChangeDate(String passwdChangeDate) {
        this.passwdChangeDate = passwdChangeDate;
    }

    public String getLastLoginDateTime() {
        return this.lastLoginDateTime;
    }

    public void setLastLoginDateTime(String lastLoginDateTime) {
        this.lastLoginDateTime = lastLoginDateTime;
    }

    public String getOrgnztPath() {
        return this.orgnztPath;
    }

    public void setOrgnztPath(String orgnztPath) {
        this.orgnztPath = orgnztPath;
    }

    public String getDisplayDeptSeq() {
        return this.displayDeptSeq;
    }

    public void setDisplayDeptSeq(String displayDeptSeq) {
        this.displayDeptSeq = displayDeptSeq;
    }

    public String getTeamYn() {
        return this.teamYn;
    }

    public void setTeamYn(String teamYn) {
        this.teamYn = teamYn;
    }

    public String getPasswdStatusCode() {
        return this.passwdStatusCode;
    }

    public void setPasswdStatusCode(String passwdStatusCode) {
        this.passwdStatusCode = passwdStatusCode;
    }



    public String getDeptId() {
        return this.deptId;
    }

    public void setDeptId(String deptId) {
        this.deptId = deptId;
    }


    public String getDeptNm() {return this.deptNm;}

    public void setDeptNm(String deptNm) {
        this.deptNm = deptNm;
    }

    public String getTeamId() {
        return this.teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId;
    }

    public String getTeamNm() {
        return this.teamNm;
    }

    public void setTeamNm(String teamNm) {
        this.teamNm = teamNm;
    }

    public String getGradeCode() {
        return this.gradeCode;
    }

    public void setGradeCode(String gradeCode) {
        this.gradeCode = gradeCode;
    }

    public String getGradeNm() {
        return this.gradeNm;
    }

    public void setGradeNm(String gradeNm) {
        this.gradeNm = gradeNm;
    }

    public String getJobDetailNm() {
        return this.jobDetailNm;
    }

    public void setJobDetailNm(String jobDetailNm) {
        this.jobDetailNm = jobDetailNm;
    }
}
