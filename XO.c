#include<stdio.h>
#include<conio.h>
#include<stdlib.h>
#include<string.h>

void disp( char a[9])
{
    printf("%c|%c|%c \n%c|%c|%c \n%c|%c|%c \n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8]);
}


void main()
{
    int i,r,c=0,s1=0,s2=0,j,k;
    char a[9],p1[100],p2[100];
    start:
    system("cls");
    printf("Enter player 1 name: ");
    gets(p1);
    printf("Enter player 2 name: ");
    gets(p2);





    for(i=0;i<=8;i++)
{
    a[i]=' ';
}
disp(a);

for(j=1;j<=9;j++)
{
    printf("Enter cell number : ");
    scanf("%d",&k);
    system("cls");
    if(k<=9&&k>=1)
    {
        i=k-1;
        if(a[i]=='X'||a[i]=='O')
        {
            printf("Bad Input\n");
            j=j-1;
        }
        if(j%2==0)
    {
        a[i]='O';
    }
    else if (j%2==1)
    {
        a[i]='X';
    }
    disp(a);
    }
    else
    {
        printf("Bad Input\n");
        j=j-1;
        disp(a);
    }
    if((a[0]==a[1] && a[1]==a[2] && a[2]!=' ') || (a[0]==a[3] && a[3]==a[6] && a[6]!=' ') || (a[6]==a[7] && a[7]==a[8] && a[8]!=' ') || (a[2]==a[5] && a[5]==a[8] && a[8]!=' ') || (a[3]==a[4] && a[4]==a[5] && a[5]!=' ') || (a[1]==a[4] && a[4]==a[7] && a[7]!=' ') || (a[0]==a[4] && a[4]==a[8] && a[8]!=' ') || (a[2]==a[4] && a[4]==a[6] && a[6]!=' ') )
    {
    c=1;
    if(j%2==0)
            {
                printf("\nPlayer %s wins\n",p2);
                s2++;
                break;
            }
    else if(j%2==1)
            {
                printf("\nPlayer %s wins\n",p1);
                s1++;
                break;
            }
    }



}
if(c==0)
{
    printf("Its a Draw\n");
}
printf("\nThe scores are\n%s=%d\n%s=%d\n",p1,p2,s1,s2);
printf("\nDo you want to play again?(Enter '1' for YES and '0' for NO) ");
scanf("%d",&r);
if(r==1)
{
    goto start;
}
else if(r==0)
{
    goto end;
}


end:
getch();
}
