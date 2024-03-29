# Generated by Django 4.2.2 on 2023-06-20 01:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_product_price'),
        ('demands', '0002_alter_demandproduct_product'),
    ]

    operations = [
        migrations.AlterField(
            model_name='demandproduct',
            name='demand',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to='demands.demand', verbose_name='Demanda'),
        ),
        migrations.AlterField(
            model_name='demandproduct',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.product', verbose_name='Produto'),
        ),
    ]
