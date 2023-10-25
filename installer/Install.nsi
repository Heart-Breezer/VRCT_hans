# Modern UI
!include MUI2.nsh
# nsDialogs
!include nsDialogs.nsh
# LogicLib
!include LogicLib.nsh

Unicode True
# �A�v���P�[�V������
Name "VRCT Setup"
# �쐬�����C���X�g�[��
OutFile "VRCT_Setup.exe"

RequestExecutionLevel admin
ShowInstDetails show

# ���k���\�b�h
SetCompressor lzma
# �C���X�g�[�������f�B���N�g��
InstallDir "$PROGRAMFILES\VRCT"
# XP�}�j�t�F�X�g
XPStyle on
# �y�[�W
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
Page custom OptionPage OptionPageLeave
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH
# �A���C���X�g�[�� �y�[�W
!insertmacro MUI_UNPAGE_WELCOME
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_UNPAGE_FINISH
# ���{��UI
!insertmacro MUI_LANGUAGE "Japanese"
# �C���^�[�t�F�[�X �ݒ�
!define MUI_ABORTWARNING
# �ϐ�
Var Checkbox_InstallDocs
Var Checkbox_InstallShortcut
Var Dialog_Options
Var InstallDocs
Var InstallShortcut
Var Label_DescriptionOptions

# ���������R�[���o�b�N
Function .onInit
  # �I�v�V�����l�����������܂��B
  StrCpy $InstallDocs ${BST_CHECKED}
  StrCpy $InstallShortcut ${BST_CHECKED}
FunctionEnd

# �I�v�V���� �y�[�W
Function OptionPage
  # nsDialogs���쐬���܂��B
  nsDialogs::Create 1018
  # �쐬���ꂽnsDialogs��ϐ��ɑ�����܂��B
  Pop $Dialog_Options

  ${If} $Dialog_Options == error
    # �_�C�A���O�̍쐬�Ɏ��s�����ꍇ�ɂ͏I�����܂��B
    Abort
  ${EndIf}

  # ���x�����쐬���܂��B
  ${NSD_CreateLabel} 0 0 100% 12u "�I�v�V������I�����Ă��������B"
  # ���x����ϐ��ɑ�����܂��B
  Pop $Label_DescriptionOptions

  ${NSD_CreateCheckbox} 0 13u 100% 12u "�h�L�������g���C���X�g�[������(&D)"
  Pop $Checkbox_InstallDocs

  ${NSD_CreateCheckbox} 0 26u 100% 12u "�f�X�N�g�b�v�ɃV���[�g�J�b�g���쐬(&D)"
  Pop $Checkbox_InstallShortcut

  ${If} $InstallDocs == ${BST_CHECKED}
    # �`�F�b�N�����͍ς̏ꍇ�A�`�F�b�N�{�b�N�X�Ƀ`�F�b�N�����܂��B
    ${NSD_Check} $Checkbox_InstallDocs
  ${EndIf}
  ${If} $InstallShortcut == ${BST_CHECKED}
    # �`�F�b�N�����͍ς̏ꍇ�A�`�F�b�N�{�b�N�X�Ƀ`�F�b�N�����܂��B
    ${NSD_Check} $Checkbox_InstallShortcut
  ${EndIf}
  nsDialogs::Show
FunctionEnd

# �I�v�V���� �y�[�W�ޏo�R�[���o�b�N
Function OptionPageLeave
  ${NSD_GetState} $Checkbox_InstallDocs $InstallDocs
  ${NSD_GetState} $Checkbox_InstallShortcut $InstallShortcut
FunctionEnd

# �f�t�H���g �Z�N�V����
Section
  # �o�͐���w�肵�܂��B
  SetOutPath "$INSTDIR"
  # �C���X�g�[�������t�@�C��
  File /r "..\dist\VRCT\"

  ${If} $InstallDocs == ${BST_CHECKED}
    # �h�L�������g���C���X�g�[������ꍇ
    # �o�͐���w�肵�܂��B
    SetOutPath "$INSTDIR\docs"
    # �C���X�g�[�������t�@�C��
    File "..\dist\README.txt"
  ${EndIf}

  # �A���C���X�g�[�����o��
  WriteUninstaller "$INSTDIR\Uninstall.exe"

  ${If} $InstallDocs == ${BST_CHECKED}
    # �f�X�N�g�b�v�ɃV���[�g�J�b�g���쐬
    CreateShortCut "$DESKTOP\VRCT.lnk" "$INSTDIR\VRCT.exe"
  ${EndIf}

  # �X�^�[�g ���j���[�ɃV���[�g�J�b�g��o�^
  CreateDirectory "$SMPROGRAMS\VRCT"
  SetOutPath "$INSTDIR"
  CreateShortcut "$SMPROGRAMS\VRCT\VRCT.lnk" "$INSTDIR\VRCT.exe" ""
  # ���W�X�g���ɓo�^
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\VRCT" "DisplayName" "VRCT"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\VRCT" "UninstallString" '"$INSTDIR\Uninstall.exe"'
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\VRCT" "DisplayIcon" '"$INSTDIR\_internal\img\vrct_logo_mark_black.ico"'
SectionEnd

# �A���C���X�g�[��
!include Uninstall.nsi
